package com.example.demo.service;

import com.example.demo.entity.Patient;
import com.example.demo.entity.User;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public Patient getPatientByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return patientRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Patient profile not found"));
    }
}
