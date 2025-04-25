package ru.kaidan.backend.configs;

import static java.util.Arrays.*;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.kaidan.backend.modules.auth.services.CookieService;
import ru.kaidan.backend.modules.auth.services.JwtService;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

  private static final List<String> EXCLUDED_PATHS = asList("/public", "/graphql", "/graphiql");
  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private final StringRedisTemplate stringRedisTemplate;
  private final CookieService cookieService;

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    if (shouldSkipFilter(request)) {
      filterChain.doFilter(request, response);
      return;
    }
    String accessToken = extractJwt(request, response);
    if (accessToken == null) {
      filterChain.doFilter(request, response);
      return;
    }
    try {
      setAuthenticationIfValid(accessToken, request);
    } catch (ExpiredJwtException exception) {
      handleExceptions(response, "{\"Expired jwt\": " + "\"" + exception.getMessage() + "\"" + "}");
      return;
    }

    filterChain.doFilter(request, response);
  }

  private String extractJwt(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    try {
      return cookieService.getValueFromCookie(request, jwtService.accessCookieName);
    } catch (AuthorizationDeniedException exception) {
      handleExceptions(
          response, "{\"Missing cookies\": " + "\"" + exception.getMessage() + "\"" + "}");
      return null;
    }
  }

  private boolean shouldSkipFilter(HttpServletRequest request) {
    return EXCLUDED_PATHS.stream().anyMatch(request.getRequestURI()::contains);
  }

  private void setAuthenticationIfValid(String token, HttpServletRequest request) {
    String username = jwtService.extractUsername(token);
    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);
      boolean isAccessTokenValid = Boolean.TRUE.equals(stringRedisTemplate.hasKey(username));
      if (jwtService.isTokenValid(token, userDetails) && isAccessTokenValid) {
        UsernamePasswordAuthenticationToken authToken =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
    }
  }

  private void handleExceptions(HttpServletResponse response, String message) throws IOException {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.setContentType("application/json");
    response.getWriter().write(message);
    response.getWriter().flush();
  }
}
