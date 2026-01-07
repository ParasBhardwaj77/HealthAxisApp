package com.example.demo.service;

import com.example.demo.entity.Doctor;
import com.example.demo.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    private final DoctorRepository doctorRepository;
    private final RestClient restClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    public GeminiService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
        this.restClient = RestClient.create();
        System.out.println(">>> GEMINI SERVICE INITIALIZED (Version: 6.0_STABLE_2026)");
    }

    public String askGemini(String userMessage) {
        List<Doctor> doctors = doctorRepository.findAll();
        System.out.println(">>> [DEBUG] GEMINI: Doctors in DB: " + doctors.size());

        if (doctors.isEmpty()) {
            return "I'm sorry, there are currently no doctors available to book in our system.";
        }

        String doctorContext = doctors.stream()
                .map(d -> String.format("- %s (ID: %s): %s", d.getFullName(), d.getId(), d.getSpecialization()))
                .collect(Collectors.joining("\n"));

        String systemPrompt = String.format(
                """
                        You are the HealthAxis AI Receptionist.
                        AVAILABLE DOCTORS:
                        %s

                        INSTRUCTIONS:
                        1. If the user query is gibberish, nonsensical, or just a greeting, DO NOT recommend a doctor. Instead, ask for clarification or their symptoms.
                        2. ONLY recommend a doctor if the user describes a legitimate medical need or asks for a specific name/specialty.
                        3. If you recommend a doctor, you MUST APPEND this tag at the very end: [ID: <DoctorID>]
                        4. Use the EXACT ID string. NO markdown, NO bolding, NO backticks around the tag.
                        5. Response MUST be under 50 words.

                        Example: "I recommend Dr. Smith. [ID: 672e81...]"

                        User Query: %s
                        """,
                doctorContext, userMessage);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(Map.of("parts", List.of(Map.of("text", systemPrompt)))));

        // 2026 Strategy: Using priority order from stable discovery logs
        String[] modelsToTry = {
                "gemini-2.5-flash",
                "gemini-2.5-pro",
                "gemini-2.0-flash",
                "gemini-2.0-flash-lite",
                "gemini-flash-latest",
                "gemini-pro-latest"
        };

        for (String model : modelsToTry) {
            System.out.println(">>> [ATTEMPT] Trying model: " + model);
            String url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key="
                    + apiKey;

            try {
                ResponseEntity<Map> responseEntity = restClient.post()
                        .uri(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(requestBody)
                        .retrieve()
                        .toEntity(Map.class);

                Map resBody = responseEntity.getBody();
                if (resBody != null && resBody.containsKey("candidates")) {
                    List candidates = (List) resBody.get("candidates");
                    if (!candidates.isEmpty()) {
                        Map candidate = (Map) candidates.get(0);
                        Map content = (Map) candidate.get("content");
                        String text = (String) ((Map) ((List) content.get("parts")).get(0)).get("text");
                        System.out.println(">>> [AI RESPONSE]: " + text);
                        System.out.println(">>> [SUCCESS] Model " + model + " responded!");
                        return text;
                    }
                }
            } catch (org.springframework.web.client.HttpClientErrorException.NotFound e) {
                System.out.println(">>> [FAIL] " + model + " not found (404).");
            } catch (Exception e) {
                System.out.println(">>> [ERROR] " + model + ": " + e.getMessage());
            }
        }

        // Final discovery probe if all fail
        probeAvailableModels();

        return "I apologize, but I'm having trouble connecting to the current 2026 Gemini AI. Please check the server logs.";
    }

    private void probeAvailableModels() {
        try {
            System.out.println(">>> [DIAGNOSTIC] Listing available models...");
            String listUrl = "https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey;
            Map modelsResponse = restClient.get().uri(listUrl).retrieve().body(Map.class);
            System.out.println(">>> [MODELS LIST]: " + modelsResponse);
        } catch (Exception e) {
            System.err.println(">>> [DIAGNOSTIC FAILED]: " + e.getMessage());
        }
    }
}
