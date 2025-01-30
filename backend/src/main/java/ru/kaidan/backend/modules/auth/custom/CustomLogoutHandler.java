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
import ru.kaidan.backend.modules.auth.services.CookieService;
import ru.kaidan.backend.modules.auth.services.JwtService;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;
import ru.kaidan.backend.utils.exceptions.custom.MissingTokenException;

@Service
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CookieService cookieService;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {

        final String refreshToken = cookieService.getValueFromCookie(request, jwtService.refreshCookieName);
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new MissingTokenException("Refresh token is missing");
        }
        UserEntity user = userRepository.findByUsername(jwtService.extractUsername(refreshToken))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        ResponseCookie accessCookie = cookieService.deleteCookie(jwtService.accessCookieName);
        ResponseCookie refreshCookie = cookieService.deleteCookie(jwtService.refreshCookieName);

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        jwtService.revokeAllUserTokens(user, TokenType.REFRESH);
        SecurityContextHolder.clearContext();
    }
}
