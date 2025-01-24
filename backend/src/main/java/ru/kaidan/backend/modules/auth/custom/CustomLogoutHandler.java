package ru.kaidan.backend.modules.auth.custom;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.auth.entities.TokenType;
import ru.kaidan.backend.modules.auth.services.JwtService;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {
        ResponseCookie accessCookie = ResponseCookie.from(jwtService.accessCookieName)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from(jwtService.refreshCookieName)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        final String refreshToken = jwtService.getTokenFromCookies(request, jwtService.refreshCookieName);
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalStateException("No refresh token found in cookies");
        }
        UserEntity user = userRepository.findByUsername(jwtService.extractUsername(refreshToken))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        jwtService.revokeAllUserTokens(user, TokenType.REFRESH);
        SecurityContextHolder.clearContext();
    }
}
