package ru.kaidan.backend.modules.auth.contollers;

import jakarta.validation.constraints.Null;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/auth")
public class PublicAuthController {

  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<Null> login(@RequestBody LoginRequest authRequest) {
    CookieResponse cookies = authService.loginUser(authRequest);
    return ResponseEntity.noContent()
        .header(HttpHeaders.SET_COOKIE, cookies.getAccessCookie().toString())
        .header(HttpHeaders.SET_COOKIE, cookies.getRefreshCookie().toString())
        .build();
  }

  @PostMapping("/register")
  public ResponseEntity<Null> register(@RequestBody RegisterRequest registerRequest) {
    CookieResponse cookies = authService.registerUser(registerRequest);
    return ResponseEntity.noContent()
        .header(HttpHeaders.SET_COOKIE, cookies.getAccessCookie().toString())
        .header(HttpHeaders.SET_COOKIE, cookies.getRefreshCookie().toString())
        .build();
  }
}
