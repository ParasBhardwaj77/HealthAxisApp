package com.example.demo.controller;

import com.example.demo.dto.ReportResponse;
import com.example.demo.entity.Report;
import com.example.demo.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    // @PreAuthorize("hasRole('DOCTOR')") // Commented out for debugging
    @PostMapping("/upload")
    public ResponseEntity<?> uploadReport(
            @RequestParam("file") MultipartFile file,
            @RequestParam("patientId") String patientId,
            Authentication auth) throws IOException {
        System.out.println("Upload Request Received");
        if (auth == null) {
            System.out.println("Auth is null");
            return ResponseEntity.status(401).body("Unauthenticated");
        }
        System.out.println("Auth Name: " + auth.getName());
        System.out.println("Authorities: " + auth.getAuthorities());

        reportService.uploadReport(file, auth.getName(), patientId);
        return ResponseEntity.ok("Report uploaded successfully");
    }

    @PreAuthorize("hasRole('PATIENT')")
    @GetMapping("/my")
    public List<ReportResponse> getMyReports(Authentication auth) {
        return reportService.getPatientReports(auth.getName());
    }

    @PreAuthorize("hasRole('DOCTOR')")
    @GetMapping("/patient/{patientId}")
    public List<ReportResponse> getPatientReports(@PathVariable String patientId) {
        return reportService.getReportsByPatientId(patientId);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadReport(@PathVariable String id) {
        Report report = reportService.getReportFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + report.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(report.getFileType()))
                .body(report.getData());
    }
}
