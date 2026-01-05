package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.example.demo.entity.Patient.Gender;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientProfileResponse {
    private String id;
    private String fullName;
    private String email;
    private Integer age;
    private Gender gender;
}
