package ru.kaidan.backend.modules.auth.contollers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.DTO.UserCredentials;
import ru.kaidan.backend.modules.auth.services.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/auth")
public class PrivateAdminController {

  private final AuthService authService;

  @PostMapping("/refresh")
  public ResponseEntity<Null> refresh(HttpServletRequest request) {
    CookieResponse cookies = authService.refreshToken(request);
    return ResponseEntity.noContent()
        .header(HttpHeaders.SET_COOKIE, cookies.getAccessCookie().toString())
        .header(HttpHeaders.SET_COOKIE, cookies.getRefreshCookie().toString())
        .build();
  }

  @GetMapping("/credentials")
  public ResponseEntity<UserCredentials> getUserCredentials(HttpServletRequest request) {
    return ResponseEntity.ok().body(authService.findCredentials(request));
  }
}
