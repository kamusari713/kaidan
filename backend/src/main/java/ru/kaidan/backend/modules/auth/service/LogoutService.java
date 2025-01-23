package ru.kaidan.backend.modules.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.auth.entities.TokenType;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    @Value("${jwt.accessToken.cookie-name}")
    private String accessCookieName;
    @Value("${jwt.refreshToken.cookie-name}")
    private String refreshCookieName;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {
        ResponseCookie accessCookie = ResponseCookie.from(accessCookieName)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from(refreshCookieName)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        final String refreshToken = jwtService.getTokenFromCookies(request, refreshCookieName);
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalStateException("No refresh token found in cookies");
        }
        UserEntity user = userRepository.findByUsername(jwtService.extractUsername(refreshToken))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        jwtService.revokeAllUserTokens(user, TokenType.REFRESH);
        SecurityContextHolder.clearContext();
    }
}
