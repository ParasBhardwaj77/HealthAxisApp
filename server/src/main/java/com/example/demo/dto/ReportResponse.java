package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {
    private String id;
    private String fileName;
    private String fileType;
    private String doctorName;
    private String patientName;
    private LocalDateTime createdAt;
}
