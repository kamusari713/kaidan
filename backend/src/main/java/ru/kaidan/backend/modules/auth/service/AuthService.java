package ru.kaidan.backend.modules.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.auth.DTO.*;
import ru.kaidan.backend.modules.auth.entities.TokenEntity;
import ru.kaidan.backend.modules.auth.repositories.TokenRepository;
import ru.kaidan.backend.modules.user.entities.Role;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;
import ru.kaidan.backend.modules.user.services.UserService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;

    public RegisterResponse registerUser(RegisterRequest registerRequest) {
        UserEntity user = new UserEntity();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setRole(Role.USER);
        userRepository.save(user);

        UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);
        saveUserToken(user, accessToken);

        return new RegisterResponse(accessToken, refreshToken);
    }

    public AuthResponse login(AuthRequest authRequest) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(authRequest.getUsernameOrEmail());
        String username = userOpt.map(UserEntity::getUsername).orElse(authRequest.getUsernameOrEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, authRequest.getPassword())
        );

        final UserDetails userDetails = userService.loadUserByUsername(authRequest.getUsernameOrEmail());
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);
        UserEntity user = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        saveUserToken(user, accessToken);

        return new AuthResponse(accessToken, refreshToken);
    }

    private void saveUserToken(UserEntity user, String accessToken) {
        TokenEntity token = TokenEntity.builder()
                .userId(user.getId())
                .token(accessToken)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(UserEntity user) {
        List<TokenEntity> validUserTokens = tokenRepository.findByUserIdAndRevokedFalse(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token ->
                token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    public AuthResponse refresh(RefreshRequest refreshRequest) throws Exception {
        String refreshToken = refreshRequest.getRefreshToken();
        if (refreshToken == null) {
            throw new Exception("Refresh token is missing");
        }

        String username;
        try {
            username = jwtService.extractUsername(refreshToken);
        } catch (Exception e) {
            throw new Exception("Invalid refresh token");
        }

        UserDetails userDetails = userService.loadUserByUsername(username);
        UserEntity user = userRepository.findByUsernameOrEmail(username, username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            throw new Exception("Invalid refresh token");
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);
        revokeAllUserTokens(user);
        saveUserToken(user, newAccessToken);

        return new AuthResponse(newAccessToken, refreshToken);
    }
}
