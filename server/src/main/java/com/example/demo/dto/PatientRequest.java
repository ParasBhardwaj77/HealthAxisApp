package com.example.demo.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PatientRequest {

    @Email @NotBlank
    private String email;

    @NotBlank
    private String password;

    private String fullName;

    private Integer age;

    private String gender;

}
