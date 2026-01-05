package com.example.demo.repository;

import com.example.demo.entity.Appointment;
import com.example.demo.entity.Doctor;
import com.example.demo.entity.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
        List<Appointment> findByPatient(Patient patient);

        List<Appointment> findByDoctor(Doctor doctor);

        List<Appointment> findByDoctorId(String doctorId);

        List<Appointment> findByDoctorAndDateTimeBetween(Doctor doctor, LocalDateTime start, LocalDateTime end);

        List<Appointment> findByDoctorIdAndDateTimeBetween(String doctorId, LocalDateTime start, LocalDateTime end);

        boolean existsByDoctorAndDateTimeAndStatusNot(Doctor doctor, LocalDateTime dateTime,
                        Appointment.AppointmentStatus status);

        boolean existsByPatientAndDateTimeAndStatusNot(Patient patient, LocalDateTime dateTime,
                        Appointment.AppointmentStatus status);
}
