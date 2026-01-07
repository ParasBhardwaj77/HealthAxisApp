package com.example.demo.repository;

import com.example.demo.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    java.util.Optional<Admin> findByUser(com.example.demo.entity.User user);
}