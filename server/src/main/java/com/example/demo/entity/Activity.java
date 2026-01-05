package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Document(collection = "activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    @Id
    private String id;
    private String description;
    private ActivityType type;
    private LocalDateTime timestamp;

    public enum ActivityType {
        NEW_PATIENT,
        NEW_DOCTOR,
        NEW_APPOINTMENT,
        UPDATE
    }
}
