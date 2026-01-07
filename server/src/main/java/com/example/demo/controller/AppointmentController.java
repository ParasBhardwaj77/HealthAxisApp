package com.example.demo.controller;

import com.example.demo.dto.AppointmentRequest;

import com.example.demo.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PreAuthorize("hasRole('PATIENT')")
    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest req, Authentication auth) {
        try {
            com.example.demo.entity.Appointment appt = appointmentService.bookAppointment(auth.getName(), req);
            return ResponseEntity.ok(new com.example.demo.dto.AppointmentResponse(appt));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping("/my")
    public List<com.example.demo.dto.AppointmentResponse> getMyAppointments(Authentication auth) {
        return appointmentService.getPatientAppointments(auth.getName());
    }

    @PreAuthorize("hasRole('PATIENT')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePendingAppointment(@PathVariable String id, Authentication auth) {
        appointmentService.deletePendingAppointment(id, auth.getName());
        return ResponseEntity.ok("Appointment deleted successfully");
    }

    @PreAuthorize("hasRole('PATIENT')")
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable String id, Authentication auth) {
        appointmentService.cancelAppointment(id, auth.getName());
        return ResponseEntity.ok("Appointment canceled successfully");
    }

    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @GetMapping("/{id}")
    public com.example.demo.dto.AppointmentResponse getAppointment(@PathVariable String id) {
        return appointmentService.getAppointmentById(id);
    }

    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @PatchMapping("/{id}/complete")
    public ResponseEntity<?> completeAppointment(@PathVariable String id) {
        appointmentService.completeAppointment(id);
        return ResponseEntity.ok("Appointment completed successfully");
    }
}
