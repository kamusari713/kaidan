package ru.kaidan.backend.modules.auth.contollers;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.DTO.UserCredentials;
import ru.kaidan.backend.modules.auth.services.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/auth")
public class PrivateAdminController {

    private final AuthService authService;

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        CookieResponse cookies = authService.refreshToken(request);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookies.getAccessCookie().toString())
                .header(HttpHeaders.SET_COOKIE, cookies.getRefreshCookie().toString())
                .body(Map.of("message", "Access token successfully refreshed"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        UserCredentials credentials = authService.findCredentials(request);
        return ResponseEntity
                .ok()
                .body(credentials);
    }

}
