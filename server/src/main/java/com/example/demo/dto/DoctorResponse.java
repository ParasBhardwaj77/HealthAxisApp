package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorResponse {
    private String id;
    private String fullName;
    private String specialization;
    private String status;
    private String email;
    private int patientCount;

}
