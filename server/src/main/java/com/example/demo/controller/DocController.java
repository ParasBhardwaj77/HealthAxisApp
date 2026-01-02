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

    @PreAuthorize("hasRole('DOCTOR')")
    @PutMapping("/doctor/leave")
    public ResponseEntity<?> updateLeaveStatus(
            @RequestParam boolean onLeave,
            Authentication authentication) {
        String email = authentication.getName(); // Extracts email from JWT
        docService.updateLeaveStatus(email, onLeave);
        return ResponseEntity.ok("Leave status updated");
    }

    @PreAuthorize("hasRole('DOCTOR')")
    @GetMapping("/doctor/me")
    public com.example.demo.dto.DoctorStatsResponse getDoctor(Authentication authentication) {
        com.example.demo.entity.Doctor doc = docService.getDoctorByEmail(authentication.getName());
        return new com.example.demo.dto.DoctorStatsResponse(
                doc.getId(),
                doc.getFullName(),
                doc.getUser() != null ? doc.getUser().getEmail() : "No Email",
                doc.getOnLeave());
    }

    @PreAuthorize("hasAnyRole('PATIENT', 'ADMIN')")
    @GetMapping("/doctors")
    public java.util.List<com.example.demo.dto.DoctorResponse> getAllDoctors() {
        return docService.getAllDoctors();
    }
}