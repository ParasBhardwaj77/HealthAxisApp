package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    @Id
    private String id;

    @DBRef
    private Patient patient;

    @DBRef
    private Doctor doctor;

    private String fileName;
    private String fileType;
    private byte[] data;
    private LocalDateTime createdAt;
}
