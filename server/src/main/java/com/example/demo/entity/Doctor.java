package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Doctor {

    @Id
    private String id;

    @DBRef
    private User user;

    private String fullName;
    private String specialization;
    private Boolean onLeave = false;

    @DBRef
    @JsonIgnore
    @JsonIgnoreProperties("doctor")
    private java.util.Set<Patient> patients = new java.util.HashSet<>();

    public java.util.Set<Patient> getPatients() {
        if (patients == null) {
            patients = new java.util.HashSet<>();
        }
        return patients;
    }
}