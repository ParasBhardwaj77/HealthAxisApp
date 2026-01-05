package com.example.demo.service;

import com.example.demo.entity.Report;
import com.example.demo.entity.Patient;
import com.example.demo.entity.Doctor;
import com.example.demo.entity.User;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.example.demo.dto.ReportResponse;

@Service
@RequiredArgsConstructor
public class ReportService {
        private final ReportRepository reportRepo;
        private final PatientRepository patientRepo;
        private final DoctorRepository doctorRepo;
        private final UserRepository userRepo;

        public void uploadReport(MultipartFile file, String doctorEmail, String patientId) throws IOException {
                User user = userRepo.findByEmail(doctorEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Doctor doctor = doctorRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Doctor profile not found"));

                Patient patient = patientRepo.findById(patientId)
                                .orElseThrow(() -> new RuntimeException("Patient not found"));

                Report report = new Report();
                report.setDoctor(doctor);
                report.setPatient(patient);
                report.setFileName(file.getOriginalFilename());
                report.setFileType(file.getContentType());
                report.setData(file.getBytes());
                report.setCreatedAt(LocalDateTime.now());

                reportRepo.save(report);
        }

        public List<ReportResponse> getReportsByPatientId(String patientId) {
                Patient patient = patientRepo.findById(patientId)
                                .orElseThrow(() -> new RuntimeException("Patient not found"));

                return reportRepo.findByPatientOrderByCreatedAtDesc(patient).stream()
                                .map(r -> new ReportResponse(
                                                r.getId(),
                                                r.getFileName(),
                                                r.getFileType(),
                                                r.getDoctor().getFullName(),
                                                r.getCreatedAt()))
                                .collect(Collectors.toList());
        }

        public List<ReportResponse> getPatientReports(String patientEmail) {
                User user = userRepo.findByEmail(patientEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Patient patient = patientRepo.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Patient profile not found"));

                return reportRepo.findByPatientOrderByCreatedAtDesc(patient).stream()
                                .map(r -> new ReportResponse(
                                                r.getId(),
                                                r.getFileName(),
                                                r.getFileType(),
                                                r.getDoctor().getFullName(),
                                                r.getCreatedAt()))
                                .collect(Collectors.toList());
        }

        public Report getReportFile(String reportId) {
                return reportRepo.findById(reportId)
                                .orElseThrow(() -> new RuntimeException("Report not found"));
        }

        public int getDoctorReportCount(Doctor doctor) {
                return reportRepo.countByDoctor(doctor);
        }
}
