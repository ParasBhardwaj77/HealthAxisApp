package com.example.demo.service;

import com.example.demo.entity.Doctor;
import com.example.demo.entity.User;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DocService {

        private final DoctorRepository doctorRepo;
        private final UserRepository userRepo;
        private final com.example.demo.repository.AppointmentRepository appointmentRepo;

        public void updateLeaveStatus(String doctorEmail, boolean onLeave) {
                // 1. Resolve User from the Email inside the JWT
                User user = userRepo.findByEmail(doctorEmail)
                                .orElseThrow(() -> new RuntimeException("User not found: " + doctorEmail));

                // 2. Resolve Doctor associated with that specific User object
                Doctor doctor = doctorRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException(
                                                "Doctor profile not found for: " + doctorEmail));

                doctor.setOnLeave(onLeave);
                doctorRepo.save(doctor);
        }

        public Doctor getDoctorByEmail(String email) {
                // 1. Resolve User from Email
                User user = userRepo.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found: " + email));

                // 2. Resolve Doctor
                return doctorRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Doctor profile not found for: " + email));
        }

        public java.util.List<com.example.demo.dto.DoctorResponse> getAllDoctors() {
                // Fetch all doctors
                java.util.List<Doctor> allDoctors = doctorRepo.findAll();

                // Fetch ALL appointments once (instead of per-doctor)
                java.util.List<com.example.demo.entity.Appointment> allAppointments = appointmentRepo.findAll();

                // Build a map: doctorId -> unique patient count
                java.util.Map<String, Long> doctorPatientCountMap = allAppointments.stream()
                                .collect(java.util.stream.Collectors.groupingBy(
                                                app -> app.getDoctor().getId(),
                                                java.util.stream.Collectors.mapping(
                                                                app -> app.getPatient().getId(),
                                                                java.util.stream.Collectors.collectingAndThen(
                                                                                java.util.stream.Collectors.toSet(),
                                                                                set -> (long) set.size()))));

                // Map doctors to responses using the pre-computed counts
                return allDoctors.stream()
                                .map(doc -> {
                                        long patientCount = doctorPatientCountMap.getOrDefault(doc.getId(), 0L);

                                        return new com.example.demo.dto.DoctorResponse(
                                                        doc.getId(),
                                                        doc.getFullName(),
                                                        doc.getSpecialization(),
                                                        doc.getOnLeave() ? "On Leave" : "Available",
                                                        doc.getUser() != null ? doc.getUser().getEmail() : "No Email",
                                                        (int) patientCount);
                                })
                                .collect(java.util.stream.Collectors.toList());
        }

        public int getUniquePatientCount(Doctor doctor) {
                return (int) appointmentRepo.findByDoctor(doctor).stream()
                                .map(app -> app.getPatient().getId())
                                .distinct()
                                .count();
        }

        public java.util.List<com.example.demo.dto.PatientResponse> getDoctorPatients(String doctorEmail) {
                System.out.println("[DocService] Fetching patients for doctor: " + doctorEmail);
                User user = userRepo.findByEmail(doctorEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Doctor doctor = doctorRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));

                System.out.println("[DocService] Doctor found: " + doctor.getFullName());

                java.util.List<com.example.demo.entity.Appointment> appointments = appointmentRepo.findByDoctor(doctor);
                System.out.println("[DocService] Total appointments for doctor: " + appointments.size());

                // Use a Map to ensure uniqueness by patient ID (distinct() doesn't work with
                // @DBRef)
                java.util.Map<String, com.example.demo.dto.PatientResponse> uniquePatients = new java.util.LinkedHashMap<>();

                for (com.example.demo.entity.Appointment app : appointments) {
                        com.example.demo.entity.Patient patient = app.getPatient();
                        if (!uniquePatients.containsKey(patient.getId())) {
                                uniquePatients.put(patient.getId(), new com.example.demo.dto.PatientResponse(
                                                patient.getId(),
                                                patient.getFullName(),
                                                patient.getUser() != null ? patient.getUser().getEmail() : "No Email",
                                                patient.getAge(),
                                                patient.getGender().toString()));
                        }
                }

                java.util.List<com.example.demo.dto.PatientResponse> patients = new java.util.ArrayList<>(
                                uniquePatients.values());
                System.out.println("[DocService] Unique patients found: " + patients.size());
                return patients;
        }
}