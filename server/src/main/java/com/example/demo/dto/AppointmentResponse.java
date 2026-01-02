package com.example.demo.dto;

import com.example.demo.entity.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private String id;
    private String patientName;
    private String doctorName;
    private LocalDateTime dateTime;
    private String status;

    // Helper constructor to map from Entity
    public AppointmentResponse(Appointment a) {
        this.id = a.getId();
        this.patientName = a.getPatientName();
        this.doctorName = a.getDoctorName();
        this.dateTime = a.getDateTime();
        this.status = a.getStatus().name();
    }
}
