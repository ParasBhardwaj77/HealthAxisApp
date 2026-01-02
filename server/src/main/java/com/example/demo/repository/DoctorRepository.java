package com.example.demo.repository;

import com.example.demo.entity.Doctor;
import com.example.demo.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    // Change this line
    Optional<Doctor> findByUser(User user);
}