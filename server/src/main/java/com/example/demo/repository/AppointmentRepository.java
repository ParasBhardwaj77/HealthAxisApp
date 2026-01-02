package com.example.demo.repository;

import com.example.demo.entity.Appointment;
import com.example.demo.entity.Doctor;
import com.example.demo.entity.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByPatient(Patient patient);

    boolean existsByDoctorAndDateTime(Doctor doctor, LocalDateTime dateTime);
}
