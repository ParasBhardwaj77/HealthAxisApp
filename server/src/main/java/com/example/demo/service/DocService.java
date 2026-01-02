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
        private final UserRepository userRepo; // Injected to resolve User by email

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
                return doctorRepo.findAll().stream()
                                .map(doc -> new com.example.demo.dto.DoctorResponse(
                                                doc.getId(),
                                                doc.getFullName(),
                                                doc.getSpecialization(),
                                                doc.getOnLeave() ? "On Leave" : "Available",
                                                doc.getUser() != null ? doc.getUser().getEmail() : "No Email",
                                                doc.getPatients().size()))
                                .collect(java.util.stream.Collectors.toList());
        }
}