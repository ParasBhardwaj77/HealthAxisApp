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

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepo.findAll().stream()
                .map(AppointmentResponse::new)
                .collect(Collectors.toList());
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
}
