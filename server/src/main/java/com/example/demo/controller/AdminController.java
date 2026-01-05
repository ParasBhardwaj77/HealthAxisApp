package com.example.demo.controller;

import com.example.demo.dto.DoctorRequest;
import com.example.demo.dto.PatientRequest;
import com.example.demo.dto.PatientResponse;
import com.example.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AuthService authService;
    private final com.example.demo.service.AdminService adminService;

    @GetMapping("/patient-list")
    public List<PatientResponse> getAllPatients() {
        System.out.println("DEBUG: [AdminController] /api/admin/patient-list hit");
        try {
            List<PatientResponse> responses = adminService.getAllPatients();
            System.out.println("DEBUG: [AdminController] Mapping successful. Returning " + responses.size() + " DTOs.");
            return responses;
        } catch (Exception e) {
            System.err.println("DEBUG: [AdminController] Error mapping patients: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @org.springframework.web.bind.annotation.GetMapping("/appointments")
    public java.util.List<com.example.demo.dto.AppointmentResponse> getAllAppointments() {
        return adminService.getAllAppointments();
    }

    @PostMapping("/doctor")
    public void createDoctor(@RequestBody DoctorRequest req) {
        authService.createDoctor(req);
    }

    @PostMapping("/patient")
    public void createPatient(@RequestBody PatientRequest req) {
        authService.createPatient(req);
    }

    @DeleteMapping("/doctors/{id}")
    public void deleteDoctor(@PathVariable String id) {
        adminService.deleteDoctor(id);
    }

    @DeleteMapping("/patients/{id}")
    public void deletePatient(@PathVariable String id) {
        adminService.deletePatient(id);
    }

    @DeleteMapping("/appointments/{id}")
    public void deleteAppointment(@PathVariable String id) {
        adminService.deleteAppointment(id);
    }

    @GetMapping("/revenue")
    public com.example.demo.dto.RevenueResponse getRevenueStats(@RequestParam(defaultValue = "all") String range) {
        return adminService.getRevenueStats(range);
    }

}
