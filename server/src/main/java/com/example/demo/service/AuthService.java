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
                System.out.println("LOGIN DEBUG: Attempting login for email: [" + req.getEmail() + "]");
                try {
                        authManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(
                                                        req.getEmail(),
                                                        req.getPassword()));
                } catch (Exception e) {
                        System.out.println("LOGIN DEBUG: Authentication failed for email: [" + req.getEmail() + "]");
                        System.out.println(
                                        "LOGIN DEBUG: Exception: " + e.getClass().getName() + " - " + e.getMessage());

                        // Debugging usage
                        userRepo.findByEmail(req.getEmail()).ifPresentOrElse(
                                        u -> {
                                                System.out.println("LOGIN DEBUG: User found in DB.");
                                                System.out.println("LOGIN DEBUG: Role: " + u.getRole());
                                                boolean matches = encoder.matches(req.getPassword(), u.getPassword());
                                                System.out.println("LOGIN DEBUG: Password matches? " + matches);
                                        },
                                        () -> System.out.println("LOGIN DEBUG: User NOT found in DB."));
                        throw e;
                }

                User user = userRepo.findByEmail(req.getEmail()).orElseThrow();

                String fullName = "User";
                if (user.getRole() == User.Role.ADMIN) {
                        fullName = adminRepo.findByUser(user).map(Admin::getFullName).orElse("Admin");
                } else if (user.getRole() == User.Role.DOCTOR) {
                        fullName = doctorRepo.findByUser(user).map(Doctor::getFullName).orElse("Doctor");
                } else if (user.getRole() == User.Role.PATIENT) {
                        fullName = patientRepo.findByUser(user).map(Patient::getFullName).orElse("Patient");
                }

                String token = jwtUtil.generateToken(
                                user.getEmail(),
                                user.getRole().name());

                return new AuthResponse(
                                token,
                                user.getEmail(),
                                user.getRole().name(),
                                fullName);
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
