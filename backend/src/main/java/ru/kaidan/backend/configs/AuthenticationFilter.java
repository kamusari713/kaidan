package ru.kaidan.backend.configs;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ru.kaidan.backend.modules.auth.repositories.TokenRepository;
import ru.kaidan.backend.modules.auth.services.CookieService;
import ru.kaidan.backend.modules.auth.services.JwtService;
import ru.kaidan.backend.utils.exceptions.custom.ExpiredTokenException;
import ru.kaidan.backend.utils.exceptions.custom.InvalidTokenException;
import ru.kaidan.backend.utils.exceptions.custom.MissingTokenException;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;
    private final CookieService cookieService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws
            ServletException,
            IOException {
        if (request.getRequestURI().contains("/public") || request.getRequestURI().contains("/graphql")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token;

        try {
            token = cookieService.getValueFromCookie(request, jwtService.accessCookieName);
        } catch (MissingTokenException e) {
            log.warn("Cookie is missing");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Cookie is missing\"}");
            response.getWriter().flush();
            return;
        }

        String username;

        try {
            username = jwtService.extractUsername(token);
        } catch (InvalidTokenException e) {
            log.warn("User has invalid token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Token is invalid\"}");
            response.getWriter().flush();
            return;
        }

        try {
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                var tokenExpired = tokenRepository.findByToken(token)
                        .map(t -> !t.getRevoked())
                        .orElse(false);
                if (!tokenExpired) {
                    throw new ExpiredTokenException("Token expired expired");
                }
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (ExpiredTokenException e) {
            log.warn("User has expired token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Token is expired\"}");
            response.getWriter().flush();
            return;
        }
        filterChain.doFilter(request, response);
    }
}
