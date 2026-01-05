package com.example.demo.repository;

import com.example.demo.entity.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ActivityRepository extends MongoRepository<Activity, String> {
    List<Activity> findTop20ByOrderByTimestampDesc();
}
