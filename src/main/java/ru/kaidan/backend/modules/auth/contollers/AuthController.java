package ru.kaidan.backend.modules.auth.contollers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.auth.dto.AuthRequest;
import ru.kaidan.backend.modules.auth.dto.TokenResponse;
import ru.kaidan.backend.modules.auth.jwt.JwtUtil;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            Optional<UserEntity> userOpt = userRepository.findByEmail(authRequest.getUsernameOrEmail());
            String username = userOpt.map(UserEntity::getUsername).orElse(authRequest.getUsernameOrEmail());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, authRequest.getPassword())
            );
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(new TokenResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}