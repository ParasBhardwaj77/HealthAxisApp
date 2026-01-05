package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorStatsResponse {
    private String id;
    private String fullName;
    private String email;
    private boolean onLeave;
    private int patientCount;
}
