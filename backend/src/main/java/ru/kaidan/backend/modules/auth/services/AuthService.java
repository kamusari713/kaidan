package ru.kaidan.backend.modules.auth.services;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.DTO.LoginRequest;
import ru.kaidan.backend.modules.auth.DTO.RegisterRequest;
import ru.kaidan.backend.modules.auth.DTO.UserCredentials;
import ru.kaidan.backend.modules.auth.custom.CustomUserDetails;
import ru.kaidan.backend.modules.auth.entities.TokenType;
import ru.kaidan.backend.modules.user.entities.RoleType;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserAnimeListRepository;
import ru.kaidan.backend.modules.user.repositories.UserRepository;
import ru.kaidan.backend.utils.exceptions.custom.ExpiredTokenException;
import ru.kaidan.backend.utils.exceptions.custom.InvalidTokenException;
import ru.kaidan.backend.utils.exceptions.custom.MissingTokenException;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final UserAnimeListRepository userAnimeListRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final CookieService cookieService;

  public CookieResponse registerUser(RegisterRequest registerRequest) {
    UserEntity user =
        UserEntity.builder()
            .username(registerRequest.getUsername())
            .password(passwordEncoder.encode(registerRequest.getPassword()))
            .email(registerRequest.getEmail())
            .bio("")
            .role(RoleType.ROLE_USER)
            .build();
    userRepository.save(user);

    CustomUserDetails customUserDetails = new CustomUserDetails(user);
    String accessToken = jwtService.generateAccessToken(customUserDetails);
    String refreshToken = jwtService.generateRefreshToken(customUserDetails);
    jwtService.saveUserToken(user, accessToken, TokenType.ACCESS);
    jwtService.saveUserToken(user, refreshToken, TokenType.REFRESH);

    return jwtService.buildTokensCookies(accessToken, refreshToken);
  }

  public CookieResponse loginUser(LoginRequest authRequest) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            authRequest.getUsername(), authRequest.getPassword()));
    UserEntity user =
        userRepository
            .findByUsername(authRequest.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    CustomUserDetails customUserDetails = new CustomUserDetails(user);
    String accessToken = jwtService.generateAccessToken(customUserDetails);
    String refreshToken = jwtService.generateRefreshToken(customUserDetails);
    jwtService.revokeAllUserTokens(user);
    jwtService.saveUserToken(user, accessToken, TokenType.ACCESS);
    jwtService.saveUserToken(user, refreshToken, TokenType.REFRESH);
    return jwtService.buildTokensCookies(accessToken, refreshToken);
  }

  public CookieResponse refreshToken(HttpServletRequest request) {
    String refreshToken = cookieService.getValueFromCookie(request, jwtService.refreshCookieName);
    if (refreshToken == null) {
      throw new MissingTokenException("Refresh token is missing");
    }

    String username = jwtService.extractUsername(refreshToken);
    if (username == null) {
      throw new InvalidTokenException("Refresh token is invalid");
    }

    UserEntity user =
        userRepository
            .findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    CustomUserDetails customUserDetails = new CustomUserDetails(user);
    if (!jwtService.isTokenValid(refreshToken, customUserDetails)) {
      throw new ExpiredTokenException(" Refresh token is expired");
    }

    String newAccessToken = jwtService.generateAccessToken(customUserDetails);
    jwtService.revokeAllUserTokens(user, TokenType.ACCESS);
    jwtService.saveUserToken(user, newAccessToken, TokenType.ACCESS);

    return jwtService.buildTokensCookies(newAccessToken, refreshToken);
  }

  public UserCredentials findCredentials(HttpServletRequest request) {
    String accessToken = cookieService.getValueFromCookie(request, jwtService.accessCookieName);
    if (accessToken == null) {
      throw new MissingTokenException("Access token is missing");
    }

    String username = jwtService.extractUsername(accessToken);
    if (username == null) {
      throw new InvalidTokenException("Access token is invalid");
    }

    UserEntity user =
        userRepository
            .findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    return UserCredentials.builder()
        .id(user.getId())
        .username(user.getUsername())
        .email(user.getEmail())
        .role(user.getRole())
        .build();
  }
}
