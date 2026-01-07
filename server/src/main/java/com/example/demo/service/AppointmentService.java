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
        private final ActivityService activityService;

        private void checkAndUpdateStatus(Appointment appointment) {
                if (appointment.getStatus() == Appointment.AppointmentStatus.UPCOMING &&
                                appointment.getDateTime().isBefore(java.time.LocalDateTime.now())) {
                        appointment.setStatus(Appointment.AppointmentStatus.CONFIRMED);
                        appointmentRepo.save(appointment);
                }
        }

        public Appointment bookAppointment(String patientEmail, AppointmentRequest req) {
                // 1. Get Patient
                User user = userRepo.findByEmail(patientEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Patient patient = patientRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Patient profile not found"));

                // 2. Get Doctor
                Doctor doctor = doctorRepo.findById(req.getDoctorId())
                                .orElseThrow(() -> new RuntimeException("Doctor not found"));

                // 3. Check Conflict
                if (appointmentRepo.existsByDoctorAndDateTimeAndStatusNot(doctor, req.getDateTime(),
                                Appointment.AppointmentStatus.CANCELED)) {
                        throw new RuntimeException("Doctor is already booked at this time");
                }
                if (appointmentRepo.existsByPatientAndDateTimeAndStatusNot(patient, req.getDateTime(),
                                Appointment.AppointmentStatus.CANCELED)) {
                        throw new RuntimeException("You already have an appointment at this time");
                }

                // 4. Create Appointment
                Appointment appointment = new Appointment();
                appointment.setPatient(patient);
                appointment.setDoctor(doctor);
                appointment.setPatientName(patient.getFullName());
                appointment.setDoctorName(doctor.getFullName());
                appointment.setDateTime(req.getDateTime());
                appointment.setStatus(Appointment.AppointmentStatus.PENDING_PAYMENT);

                appointmentRepo.save(appointment);

                // 5. Update Doctor's patient list (Unique patients)
                doctor.getPatients().add(patient);
                doctorRepo.save(doctor);

                // 5. Update Patient's appointment list (Bidirectional)
                patient.getAppointments().add(appointment);
                patientRepo.save(patient);

                // 6. Log Activity
                activityService.logActivity(
                                "Appointment scheduled: " + patient.getFullName() + " with " + doctor.getFullName(),
                                com.example.demo.entity.Activity.ActivityType.NEW_APPOINTMENT);
                return appointment;
        }

        public java.util.List<com.example.demo.dto.AppointmentResponse> getPatientAppointments(String patientEmail) {
                User user = userRepo.findByEmail(patientEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Patient patient = patientRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Patient profile not found"));

                return appointmentRepo.findByPatient(patient).stream()
                                .peek(this::checkAndUpdateStatus)
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

                // Since we use DBRef, fetching the patient again will show the updated status
                // in the referenced object.
        }

        public void deletePendingAppointment(String id, String patientEmail) {
                Appointment appointment = appointmentRepo.findById(id)
                                .orElseThrow(() -> new RuntimeException("Appointment not found"));

                // Verify ownership
                if (!appointment.getPatient().getUser().getEmail().equals(patientEmail)) {
                        throw new RuntimeException("Unauthorized");
                }

                if (appointment.getStatus() == Appointment.AppointmentStatus.PENDING_PAYMENT) {
                        appointmentRepo.delete(appointment);
                } else {
                        throw new RuntimeException("Cannot delete confirmed appointment");
                }
        }

        public java.util.List<com.example.demo.dto.AppointmentResponse> getDoctorAppointmentsToday(String doctorEmail) {
                User user = userRepo.findByEmail(doctorEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Doctor doctor = doctorRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));

                java.time.LocalDateTime start = java.time.LocalDate.now().atStartOfDay();
                java.time.LocalDateTime end = java.time.LocalDate.now().atTime(23, 59, 59);

                return appointmentRepo.findByDoctorAndDateTimeBetween(doctor, start, end).stream()
                                .peek(this::checkAndUpdateStatus)
                                .map(com.example.demo.dto.AppointmentResponse::new)
                                .collect(java.util.stream.Collectors.toList());
        }

        public java.util.List<com.example.demo.dto.AppointmentResponse> getDoctorAppointments(String doctorEmail) {
                User user = userRepo.findByEmail(doctorEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Doctor doctor = doctorRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));

                return appointmentRepo.findByDoctor(doctor).stream()
                                .peek(this::checkAndUpdateStatus)
                                .map(com.example.demo.dto.AppointmentResponse::new)
                                .collect(java.util.stream.Collectors.toList());
        }

        public java.util.List<com.example.demo.dto.AppointmentResponse> getAllAppointments() {
                return appointmentRepo.findAll().stream()
                                .peek(this::checkAndUpdateStatus)
                                .map(com.example.demo.dto.AppointmentResponse::new)
                                .collect(java.util.stream.Collectors.toList());
        }

        public com.example.demo.dto.AppointmentResponse getAppointmentById(String id) {
                Appointment appointment = appointmentRepo.findById(id)
                                .orElseThrow(() -> new RuntimeException("Appointment not found"));
                checkAndUpdateStatus(appointment);
                return new com.example.demo.dto.AppointmentResponse(appointment);
        }

        public void completeAppointment(String appointmentId) {
                Appointment appointment = appointmentRepo.findById(appointmentId)
                                .orElseThrow(() -> new RuntimeException("Appointment not found"));

                // Update status to CONFIRMED when call ends
                if (appointment.getStatus() == Appointment.AppointmentStatus.UPCOMING) {
                        appointment.setStatus(Appointment.AppointmentStatus.CONFIRMED);
                        appointmentRepo.save(appointment);
                }
        }
}
