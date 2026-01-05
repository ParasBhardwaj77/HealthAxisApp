package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RevenueResponse {
    private Double totalRevenue;
    // Map of Date/Month to Revenue for that period
    // e.g., "2024-01-01": 200.0
    private Map<String, Double> revenueByDate;
}
