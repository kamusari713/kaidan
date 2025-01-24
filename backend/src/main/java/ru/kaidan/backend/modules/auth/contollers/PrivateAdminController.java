package ru.kaidan.backend.modules.auth.contollers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.services.AuthService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/auth")
public class PrivateAdminController {
    private final AuthService authService;

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        try {
            CookieResponse cookies = authService.refreshToken(request);
            return ResponseEntity
                    .ok()
                    .header(HttpHeaders.SET_COOKIE, cookies.getAccessCookie().toString())
                    .header(HttpHeaders.SET_COOKIE, cookies.getRefreshCookie().toString())
                    .body(Map.of("message", "Access token successfully refreshed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
}
