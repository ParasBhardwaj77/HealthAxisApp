package com.example.demo.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentRequest {
    private String doctorId;
    private LocalDateTime dateTime;
}
