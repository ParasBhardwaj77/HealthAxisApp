package com.example.demo.service;

import com.example.demo.dto.AppointmentRequest;
import com.example.demo.entity.Appointment;
import com.example.demo.entity.Doctor;
import com.example.demo.entity.Patient;
import com.example.demo.entity.User;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentService {

        private final AppointmentRepository appointmentRepo;
        private final DoctorRepository doctorRepo;
        private final PatientRepository patientRepo;
        private final UserRepository userRepo;

        public void bookAppointment(String patientEmail, AppointmentRequest req) {
                // 1. Get Patient
                User user = userRepo.findByEmail(patientEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Patient patient = patientRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Patient profile not found"));

                // 2. Get Doctor
                Doctor doctor = doctorRepo.findById(req.getDoctorId())
                                .orElseThrow(() -> new RuntimeException("Doctor not found"));

                // 3. Check Conflict
                if (appointmentRepo.existsByDoctorAndDateTime(doctor, req.getDateTime())) {
                        throw new RuntimeException("Doctor is already booked at this time");
                }

                // 4. Create Appointment
                Appointment appointment = new Appointment();
                appointment.setPatient(patient);
                appointment.setDoctor(doctor);
                appointment.setPatientName(patient.getFullName());
                appointment.setDoctorName(doctor.getFullName());
                appointment.setDateTime(req.getDateTime());
                appointment.setStatus(Appointment.AppointmentStatus.UPCOMING);

                appointmentRepo.save(appointment);

                // 5. Update Doctor's patient list (Unique patients)
                doctor.getPatients().add(patient);
                doctorRepo.save(doctor);

                // 5. Update Patient's appointment list (Bidirectional)
                patient.getAppointments().add(appointment);
                patientRepo.save(patient);
        }

        public java.util.List<com.example.demo.dto.AppointmentResponse> getPatientAppointments(String patientEmail) {
                User user = userRepo.findByEmail(patientEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Patient patient = patientRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Patient profile not found"));

                return appointmentRepo.findByPatient(patient).stream()
                                .map(com.example.demo.dto.AppointmentResponse::new)
                                .collect(java.util.stream.Collectors.toList());
        }

        public void cancelAppointment(String id, String patientEmail) {
                Appointment appointment = appointmentRepo.findById(id)
                                .orElseThrow(() -> new RuntimeException("Appointment not found"));

                // Verify ownership
                if (!appointment.getPatient().getUser().getEmail().equals(patientEmail)) {
                        throw new RuntimeException("Unauthorized to cancel this appointment");
                }

                appointment.setStatus(Appointment.AppointmentStatus.CANCELED);
                appointmentRepo.save(appointment);

                // Update in Patient's list as well (since it's a reference, strictly speaking
                // the object in DB is updated,
                // but if we were holding a separate copy we'd need to update it.
                // Since we use DBRef, fetching the patient again will show the updated status
                // in the referenced object.
        }
}
