package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HealthaxisApplication {

	public static void main(String[] args) {
		loadEnv();
		System.out.println("================================");
		System.out.println(">>> RUNNING VERSION: 6.0_FINAL_REBUILD");
		System.out.println("================================");
		SpringApplication.run(HealthaxisApplication.class, args);
	}

	private static void loadEnv() {
		try {
			java.nio.file.Path envPath = java.nio.file.Paths.get(".env");
			if (java.nio.file.Files.exists(envPath)) {
				java.util.List<String> lines = java.nio.file.Files.readAllLines(envPath);
				for (String line : lines) {
					if (line.trim().isEmpty() || line.trim().startsWith("#")) {
						continue;
					}
					String[] parts = line.split("=", 2);
					if (parts.length == 2) {
						String key = parts[0].trim();
						String value = parts[1].trim();
						System.setProperty(key, value);
					}
				}
				System.out.println(">>> Loaded .env file successfully");
			}
		} catch (Exception e) {
			System.out.println(">>> Failed to load .env file: " + e.getMessage());
		}
	}

}
