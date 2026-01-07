package com.example.demo.controller;

import com.example.demo.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/ask")
    public ResponseEntity<Map<String, String>> askBot(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message cannot be empty"));
        }

        String aiResponse = geminiService.askGemini(userMessage);

        // Extract intent if present
        // Extract intent if present (supports [ID: ], [BOOK_DOCTOR_ID: ], etc.)
        String intent = "NONE";
        boolean hasTag = aiResponse.contains("[ID:") ||
                aiResponse.contains("[BOOK_DOCTOR_ID:") ||
                aiResponse.contains("[DOCTOR_ID:");

        if (hasTag) {
            intent = "BOOKING_SUGGESTED";
        }

        return ResponseEntity.ok(Map.of(
                "response", aiResponse,
                "intent", intent));
    }
}
