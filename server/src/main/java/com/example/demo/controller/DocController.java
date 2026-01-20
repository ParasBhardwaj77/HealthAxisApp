package com.example.demo.controller;
import com.example.demo.service.DocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DocController {

    private final DocService docService;
    private final com.example.demo.service.AppointmentService appointmentService;

    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @PutMapping("/doctor/leave")
    public ResponseEntity<?> updateLeaveStatus(
            @RequestParam boolean onLeave,
            Authentication authentication) {
        String email = authentication.getName(); // Extracts email from JWT
        docService.updateLeaveStatus(email, onLeave);
        return ResponseEntity.ok("Leave status updated");
    }

    private final com.example.demo.service.ReportService reportService; // Inject ReportService

    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @GetMapping("/doctor/me")
    public com.example.demo.dto.DoctorStatsResponse getDoctor(Authentication authentication) {
        com.example.demo.entity.Doctor doc = docService.getDoctorByEmail(authentication.getName());
        return new com.example.demo.dto.DoctorStatsResponse(
                doc.getId(),
                doc.getFullName(),
                doc.getUser() != null ? doc.getUser().getEmail() : "No Email",
                doc.getOnLeave(),
                docService.getUniquePatientCount(doc),
                reportService.getDoctorReportCount(doc));
    }

    @PreAuthorize("hasAnyRole('PATIENT', 'ADMIN')")
    @GetMapping("/doctors")
    public java.util.List<com.example.demo.dto.DoctorResponse> getAllDoctors() {
        return docService.getAllDoctors();
    }

    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @GetMapping("/doctor/appointments/today")
    public java.util.List<com.example.demo.dto.AppointmentResponse> getTodaySchedule(Authentication authentication) {
        return appointmentService.getDoctorAppointmentsToday(authentication.getName());
    }

    @GetMapping("/doctor/appointments/all")
    public java.util.List<com.example.demo.dto.AppointmentResponse> getAllDoctorAppointments(
            Authentication authentication) {
        if (authentication == null) {
            throw new RuntimeException("Authentication failed: User is null");
        }
        return appointmentService.getDoctorAppointments(authentication.getName());
    }

    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @GetMapping("/doctor/patients")
    public java.util.List<com.example.demo.dto.PatientResponse> getDoctorPatients(
            Authentication authentication) {
        return docService.getDoctorPatients(authentication.getName());
    }
}