package com.example.demo.service;

import com.example.demo.dto.AppointmentResponse;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final PatientRepository patientRepo;
    private final DoctorRepository doctorRepo;
    private final UserRepository userRepo;
    private final AppointmentRepository appointmentRepo;

    public List<com.example.demo.dto.PatientResponse> getAllPatients() {
        System.out.println("DEBUG: AdminService.getAllPatients called - Mapping to PatientResponse DTO");
        return patientRepo.findAll().stream()
                .map(p -> new com.example.demo.dto.PatientResponse(
                        p.getId(),
                        p.getFullName(),
                        p.getUser() != null ? p.getUser().getEmail() : "No Email",
                        p.getAge() != null ? p.getAge() : 0,
                        p.getGender() != null ? p.getGender().name() : "N/A"))
                .collect(Collectors.toList());
    }

    private final AppointmentService appointmentService;

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    public void deleteDoctor(String id) {
        doctorRepo.findById(id).ifPresent(doc -> {
            if (doc.getUser() != null) {
                userRepo.delete(doc.getUser());
            }
            doctorRepo.delete(doc);
        });
    }

    public void deletePatient(String id) {
        patientRepo.findById(id).ifPresent(p -> {
            if (p.getUser() != null) {
                userRepo.delete(p.getUser());
            }
            patientRepo.delete(p);
        });
    }

    public void deleteAppointment(String id) {
        appointmentRepo.deleteById(id);
    }

    public com.example.demo.dto.RevenueResponse getRevenueStats(String range) {
        List<com.example.demo.entity.Appointment> paidAppointments = appointmentRepo.findByPaymentStatus("PAID");
        java.time.LocalDateTime now = java.time.LocalDateTime.now();

        List<com.example.demo.entity.Appointment> filteredAppointments = paidAppointments;
        java.util.Map<String, Double> revenueByDate;

        if ("today".equalsIgnoreCase(range)) {
            filteredAppointments = paidAppointments.stream()
                    .filter(a -> a.getDateTime().toLocalDate().isEqual(now.toLocalDate()))
                    .collect(Collectors.toList());

            revenueByDate = filteredAppointments.stream()
                    .collect(Collectors.groupingBy(
                            a -> String.format("%02d:00", a.getDateTime().getHour()),
                            Collectors.summingDouble(a -> 100.0)));
        } else if ("week".equalsIgnoreCase(range)) {
            filteredAppointments = paidAppointments.stream()
                    .filter(a -> a.getDateTime().isAfter(now.minusDays(7)))
                    .collect(Collectors.toList());

            revenueByDate = filteredAppointments.stream()
                    .collect(Collectors.groupingBy(
                            a -> a.getDateTime().toLocalDate().toString(),
                            Collectors.summingDouble(a -> 100.0)));
        } else if ("month".equalsIgnoreCase(range)) {
            filteredAppointments = paidAppointments.stream()
                    .filter(a -> a.getDateTime().isAfter(now.minusDays(30)))
                    .collect(Collectors.toList());

            revenueByDate = filteredAppointments.stream()
                    .collect(Collectors.groupingBy(
                            a -> a.getDateTime().toLocalDate().toString(),
                            Collectors.summingDouble(a -> 100.0)));
        } else {
            // Default "all" or any other case
            revenueByDate = paidAppointments.stream()
                    .collect(Collectors.groupingBy(
                            a -> a.getDateTime().toLocalDate().toString(),
                            Collectors.summingDouble(a -> 100.0)));
        }

        // Calculate total revenue from ALL paid appointments, or just the filtered
        // ones?
        // Usually "Total Revenue" on the dashboard implies All-Time.
        // But the user might expect the "Total" to reflect the filter?
        // "Show total revenue and revenue grouped by date".
        // Let's keep totalRevenue as ALL time for the main card, as that's standard
        // dashboard behavior.
        // Unless the user explicitly asked for "Revenue for past 7 days card".
        // The implementation_plan said "Display Total Revenue Card" separate from
        // graph.
        double totalRevenue = paidAppointments.size() * 100.0;

        return new com.example.demo.dto.RevenueResponse(totalRevenue, revenueByDate);
    }
}
