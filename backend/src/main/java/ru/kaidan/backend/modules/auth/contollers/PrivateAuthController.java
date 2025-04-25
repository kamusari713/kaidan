package ru.kaidan.backend.modules.auth.contollers;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.auth.DTO.UserCredentials;
import ru.kaidan.backend.modules.auth.services.AuthService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/auth")
public class PrivateAuthController {

  private final AuthService authService;

  @GetMapping("/credentials")
  public ResponseEntity<UserCredentials> getUserCredentials(HttpServletRequest request) {
    return ResponseEntity.ok().body(authService.findCredentials(request));
  }
}
