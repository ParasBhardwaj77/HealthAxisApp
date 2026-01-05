package com.example.demo.repository;

import com.example.demo.entity.Report;
import com.example.demo.entity.Patient;
import com.example.demo.entity.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReportRepository extends MongoRepository<Report, String> {
    List<Report> findByPatientOrderByCreatedAtDesc(Patient patient);

    List<Report> findByDoctorOrderByCreatedAtDesc(Doctor doctor);

    int countByDoctor(Doctor doctor);
}
