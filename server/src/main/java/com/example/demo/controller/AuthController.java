package com.example.demo.controller;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public void registerAdmin(@RequestBody AuthRequest req) {
        authService.registerAdmin(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {
        return authService.login(req);
    }

    @PostMapping("/cleanup-admin")
    public String cleanupAdmin(@RequestBody AuthRequest req) {
        // Temporary endpoint to fix duplicate user issue
        // Manually deletes ALL users with this email so we can register fresh
        authService.messyCleanup(req.getEmail());
        return "Cleanup done for " + req.getEmail();
    }

}
