package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Appointment {

    @Id
    private String id;

    @DBRef
    @JsonIgnore
    @JsonIgnoreProperties("appointments")
    private Patient patient;

    @DBRef
    @JsonIgnore
    @JsonIgnoreProperties("patients")
    private Doctor doctor;

    private String patientName;
    private String doctorName;

    private LocalDateTime dateTime;

    private AppointmentStatus status;

    public enum AppointmentStatus {
        UPCOMING,
        CONFIRMED,
        COMPLETED,
        CANCELED
    }
}
