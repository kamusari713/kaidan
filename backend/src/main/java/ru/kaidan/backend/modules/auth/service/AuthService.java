package ru.kaidan.backend.modules.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.DTO.LoginRequest;
import ru.kaidan.backend.modules.auth.DTO.RegisterRequest;
import ru.kaidan.backend.modules.auth.details.CustomUserDetails;
import ru.kaidan.backend.modules.auth.entities.TokenEntity;
import ru.kaidan.backend.modules.auth.entities.TokenType;
import ru.kaidan.backend.modules.auth.repositories.TokenRepository;
import ru.kaidan.backend.modules.user.entities.RoleType;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
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
                .httpOnly(false)
                .secure(false)
                .maxAge(accessTokenExpiration)
                .path("/")
                .sameSite("Strict")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from(refreshCookieName, refreshToken)
                .httpOnly(false)
                .secure(false)
                .maxAge(refreshTokenExpiration)
                .path("/")
                .sameSite("Strict")
                .build();

        return new CookieResponse(accessCookie, refreshCookie);
    }

    private String getTokenFromCookies(HttpServletRequest request, String cookieName) {
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public CookieResponse registerUser(RegisterRequest registerRequest) {
        UserEntity user = new UserEntity();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setRole(RoleType.USER);
        userRepository.save(user);

        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        String accessToken = jwtService.generateAccessToken(customUserDetails);
        String refreshToken = jwtService.generateRefreshToken(customUserDetails);
        saveUserToken(user, accessToken, TokenType.ACCESS);
        saveUserToken(user, refreshToken, TokenType.REFRESH);

        return buildCookies(accessToken, refreshToken);
    }

    public CookieResponse loginUser(LoginRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword())
        );
        UserEntity user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        String accessToken = jwtService.generateAccessToken(customUserDetails);
        String refreshToken = jwtService.generateRefreshToken(customUserDetails);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken, TokenType.ACCESS);
        saveUserToken(user, refreshToken, TokenType.REFRESH);
        return buildCookies(accessToken, refreshToken);
    }

    public CookieResponse refreshToken(HttpServletRequest request) throws Exception {
        String refreshToken = getTokenFromCookies(request, refreshCookieName);
        if (refreshToken == null) {
            throw new Exception("Refresh token is missing");
        }

        String username;
        try {
            username = jwtService.extractUsername(refreshToken);
        } catch (Exception e) {
            throw new Exception("Invalid refresh token");
        }

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        if (!jwtService.isTokenValid(refreshToken, customUserDetails)) {
            throw new Exception("Invalid refresh token");
        }

        String newAccessToken = jwtService.generateAccessToken(customUserDetails);
        revokeAllUserTokens(user, TokenType.ACCESS);
        saveUserToken(user, newAccessToken, TokenType.ACCESS);

        return buildCookies(newAccessToken, refreshToken);
    }
}
