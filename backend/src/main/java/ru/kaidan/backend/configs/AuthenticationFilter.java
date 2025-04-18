package ru.kaidan.backend.configs;

import static java.util.Arrays.*;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
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

  private static final List<String> EXCLUDED_PATHS = asList("/public", "/graphql", "/graphiql");
  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private final TokenRepository tokenRepository;
  private final CookieService cookieService;

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {

    String requestUri = request.getRequestURI();
    if (isExcludedPath(requestUri)) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = cookieService.getValueFromCookie(request, jwtService.accessCookieName);
    if (token == null) {
      log.warn("Missing token for request: {}", requestUri);
      throw new MissingTokenException("Токен отсутствует в куки");
    }

    String username = jwtService.extractUsername(token);
    if (username == null) {
      log.warn("Invalid token for request: {}", requestUri);
      throw new InvalidTokenException("Токен недействителен");
    }

    boolean isTokenValid =
        tokenRepository
            .findByToken(token)
            .map(tokenEntity -> !tokenEntity.getRevoked())
            .orElse(false);
    if (!isTokenValid) {
      log.warn("Expired or revoked token for user: {} on request: {}", username, requestUri);
      throw new ExpiredTokenException("Токен истёк или был отозван");
    }

    if (SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);
      UsernamePasswordAuthenticationToken authToken =
          new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
      SecurityContextHolder.getContext().setAuthentication(authToken);
      log.debug("Successfully authenticated user: {} for request: {}", username, requestUri);
    }

    filterChain.doFilter(request, response);
  }

  private boolean isExcludedPath(String requestUri) {
    return EXCLUDED_PATHS.stream().anyMatch(requestUri::contains);
  }
}
