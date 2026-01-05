package com.example.demo.service;

import com.example.demo.entity.Activity;
import com.example.demo.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    public void logActivity(String description, Activity.ActivityType type) {
        Activity activity = new Activity();
        activity.setDescription(description);
        activity.setType(type);
        activity.setTimestamp(LocalDateTime.now());
        activityRepository.save(activity);
    }

    public List<Activity> getRecentActivities() {
        return activityRepository.findTop20ByOrderByTimestampDesc();
    }
}
