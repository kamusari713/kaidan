package ru.kaidan.backend.modules.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.auth.DTO.AuthRequest;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.DTO.RegisterRequest;
import ru.kaidan.backend.modules.auth.entities.TokenEntity;
import ru.kaidan.backend.modules.auth.entities.TokenType;
import ru.kaidan.backend.modules.auth.repositories.TokenRepository;
import ru.kaidan.backend.modules.user.entities.RoleType;
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

    @Value("${jwt.accessToken.cookie-name}")
    private String accessCookieName;
    @Value("${jwt.refreshToken.cookie-name}")
    private String refreshCookieName;

    @Value("${jwt.accessToken.expiration}")
    private long accessTokenExpiration;
    @Value("${jwt.refreshToken.expiration}")
    private long refreshTokenExpiration;

    private void revokeAllUserTokens(UserEntity user) {
        List<TokenEntity> validUserTokens = tokenRepository.findByUserIdAndRevokedFalse(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token ->
                token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    private void revokeAllUserTokens(UserEntity user, TokenType tokenType) {
        List<TokenEntity> validUserTokens = tokenRepository.findByUserIdAndRevokedFalseAndType(user.getId(), tokenType);
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token ->
                token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(UserEntity user, String accessToken, TokenType tokenType) {
        TokenEntity token = TokenEntity.builder()
                .userId(user.getId())
                .token(accessToken)
                .type(tokenType)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private CookieResponse buildCookies(String accessToken, String refreshToken) {
        ResponseCookie accessCookie = ResponseCookie.from(accessCookieName, accessToken)
                .httpOnly(true)
                .secure(true)
                .maxAge(accessTokenExpiration)
                .path("/")
                .sameSite("Strict")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from(refreshCookieName, refreshToken)
                .httpOnly(true)
                .secure(true)
                .maxAge(refreshTokenExpiration)
                .path("/")
                .sameSite("Strict")
                .build();

        return new CookieResponse(accessCookie, refreshCookie);
    }

    public CookieResponse registerUser(RegisterRequest registerRequest) {
        UserEntity user = new UserEntity();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setRole(RoleType.USER);
        userRepository.save(user);

        UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);
        saveUserToken(user, accessToken, TokenType.ACCESS);
        saveUserToken(user, refreshToken, TokenType.REFRESH);

        return buildCookies(accessToken, refreshToken);
    }

    public CookieResponse login(AuthRequest authRequest) {
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
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken, TokenType.ACCESS);
        saveUserToken(user, refreshToken, TokenType.REFRESH);

        return buildCookies(accessToken, refreshToken);
    }

    public CookieResponse refresh(HttpServletRequest request) throws Exception {
        String refreshToken = request.getHeader(refreshCookieName);
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
        revokeAllUserTokens(user, TokenType.ACCESS);
        saveUserToken(user, newAccessToken, TokenType.ACCESS);

        return buildCookies(newAccessToken, refreshToken);
    }
}
