package ru.kaidan.backend.modules.auth.contollers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.DTO.LoginRequest;
import ru.kaidan.backend.modules.auth.DTO.RegisterRequest;
import ru.kaidan.backend.modules.auth.services.AuthService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/auth")
public class PublicAuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest authRequest) {
        CookieResponse cookies = authService.loginUser(authRequest);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookies.getAccessCookie().toString())
                .header(HttpHeaders.SET_COOKIE, cookies.getRefreshCookie().toString())
                .body(Map.of("message", "User successfully logged in"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        CookieResponse cookies = authService.registerUser(registerRequest);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookies.getAccessCookie().toString())
                .header(HttpHeaders.SET_COOKIE, cookies.getRefreshCookie().toString())
                .body(Map.of("message", "User successfully registered"));
    }
}