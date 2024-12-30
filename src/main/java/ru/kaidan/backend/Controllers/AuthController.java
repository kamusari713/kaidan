package ru.kaidan.backend.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.Entities.User;
import ru.kaidan.backend.Models.SignInRequest;
import ru.kaidan.backend.Models.SignUpRequest;
import ru.kaidan.backend.Repositories.UserRepository;
import ru.kaidan.backend.Services.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final UserRepository userRepository;


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest) {
        userService.register(signUpRequest);
        return ResponseEntity.ok("Sign up successful");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInRequest signInRequest) {
        User user = userRepository
                .findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(signInRequest.getPassword(), user.getHashedPassword())) {
            return ResponseEntity.status(401).body("Неверный пароль");
        }
        String token = userService.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "username", user.getName(), "user_id", user.getId()));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        String email = userService.getEmailByToken(token);
        if (email == null) {
            return ResponseEntity.status(401).body("Токен недействителен");
        }
        System.out.println("Вызвалось");
        return ResponseEntity.ok(Map.of("email", email));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        userService.invalidateToken(token);
        return ResponseEntity.ok("Вы вышли из системы");
    }
}