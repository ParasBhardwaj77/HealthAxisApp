package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepo;
        private final AdminRepository adminRepo;
        private final DoctorRepository doctorRepo;
        private final PatientRepository patientRepo;
        private final PasswordEncoder encoder;
        private final JwtUtil jwtUtil;
        private final AuthenticationManager authManager;
        private final ActivityService activityService;

        public void registerAdmin(AuthRequest req) {
                if (!req.getEmail().endsWith("@admin.com"))
                        throw new RuntimeException("Only admin emails allowed");

                User user = new User(
                                null,
                                req.getEmail(),
                                encoder.encode(req.getPassword()),
                                User.Role.ADMIN,
                                true);

                userRepo.save(user);
                adminRepo.save(new Admin(null, user, req.getName()));
        }

        public AuthResponse login(AuthRequest req) {

                authManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                req.getEmail(),
                                                req.getPassword()));

                User user = userRepo.findByEmail(req.getEmail()).orElseThrow();

                String token = jwtUtil.generateToken(
                                user.getEmail(),
                                user.getRole().name());

                return new AuthResponse(
                                token,
                                user.getEmail(),
                                user.getRole().name());
        }

        public void createDoctor(DoctorRequest req) {

                User user = new User(
                                null,
                                req.getEmail(),
                                encoder.encode(req.getPassword()),
                                User.Role.DOCTOR,
                                true);

                userRepo.save(user);

                doctorRepo.save(
                                new Doctor(
                                                null,
                                                user,
                                                req.getFullName(),
                                                req.getSpecialization(),
                                                false, // 👈 default onLeave = false
                                                new java.util.HashSet<Patient>() // 👈 new patients
                                ));

                activityService.logActivity("New doctor registered: " + req.getFullName(),
                                Activity.ActivityType.NEW_DOCTOR);
        }

        public void createPatient(PatientRequest req) {

                User user = new User(
                                null,
                                req.getEmail(),
                                encoder.encode(req.getPassword()),
                                User.Role.PATIENT,
                                true);

                userRepo.save(user);

                Patient patient = new Patient(
                                null,
                                user,
                                req.getFullName(),
                                req.getAge(),
                                Patient.Gender.valueOf(req.getGender().toUpperCase()),
                                new java.util.ArrayList<>());

                patientRepo.save(patient);

                activityService.logActivity("New patient registered: " + req.getFullName(),
                                Activity.ActivityType.NEW_PATIENT);
        }

}
