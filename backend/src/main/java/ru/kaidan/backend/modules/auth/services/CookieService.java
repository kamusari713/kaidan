package ru.kaidan.backend.modules.auth.services;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import ru.kaidan.backend.utils.exceptions.custom.MissingTokenException;

@Component
public class CookieService {

  public ResponseCookie createCookie(String cookieName, String cookieValue, Long cookieExpiration) {
    return ResponseCookie.from(cookieName, cookieValue)
        .maxAge(cookieExpiration)
        .httpOnly(true)
        .secure(false)
        .sameSite("Strict")
        .path("/")
        .build();
  }

  public ResponseCookie deleteCookie(String cookieName) {
    return ResponseCookie.from(cookieName, "")
        .httpOnly(false)
        .path("/")
        .maxAge(0)
        .sameSite("Strict")
        .build();
  }

  public String getValueFromCookie(HttpServletRequest request, String cookieName) {
    try {
      Cookie[] cookies = request.getCookies();
      return Arrays.stream(cookies)
          .filter(cookie -> cookie.getName().equals(cookieName))
          .findFirst()
          .map(Cookie::getValue)
          .orElse(null);
    } catch (RuntimeException exception) {
      throw new MissingTokenException("Missing token exception");
    }
  }
}
