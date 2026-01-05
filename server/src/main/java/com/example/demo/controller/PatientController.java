package com.example.demo.controller;

import com.example.demo.dto.PatientProfileResponse;
import com.example.demo.entity.Patient;
import com.example.demo.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping("/patient/me")
    public PatientProfileResponse getMyProfile(Authentication authentication) {
        String email = authentication.getName();
        Patient patient = patientService.getPatientByEmail(email);

        return new PatientProfileResponse(
                patient.getId(),
                patient.getFullName(),
                patient.getUser().getEmail(),
                patient.getAge(),
                patient.getGender());
    }
}
