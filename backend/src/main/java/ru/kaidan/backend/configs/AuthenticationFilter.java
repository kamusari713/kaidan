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
        final String token = cookieService.getValueFromCookie(request, jwtService.accessCookieName);
        if (token == null) {
            log.error("Missing Token");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing Token");
            return;
        }

        String username = jwtService.extractUsername(token);
        if (username == null) {
            log.error("Access token is invalid");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access token is invalid");
            return;
        }

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            var tokenExpired = tokenRepository.findByToken(token)
                    .map(t -> !t.getRevoked())
                    .orElse(false);
            if (!tokenExpired) {
                log.error("Access token is expired");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access token is expired");
                return;
            }
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }
}
