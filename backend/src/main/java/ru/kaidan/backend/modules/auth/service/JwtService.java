package ru.kaidan.backend.modules.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.entities.TokenEntity;
import ru.kaidan.backend.modules.auth.entities.TokenType;
import ru.kaidan.backend.modules.auth.repositories.TokenRepository;
import ru.kaidan.backend.modules.user.entities.UserEntity;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtService {
    private final TokenRepository tokenRepository;
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.accessToken.cookie-name}")
    private String accessCookieName;
    @Value("${jwt.accessToken.expiration}")
    private long accessTokenExpiration;
    @Value("${jwt.refreshToken.cookie-name}")
    private String refreshCookieName;
    @Value("${jwt.refreshToken.expiration}")
    private long refreshTokenExpiration;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String buildToken(String subject, long expiration) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String generateAccessToken(UserDetails user) {
        return buildToken(user.getUsername(), accessTokenExpiration);
    }

    public String generateRefreshToken(UserDetails user) {
        return buildToken(user.getUsername(), refreshTokenExpiration);
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public CookieResponse buildCookies(String accessToken, String refreshToken) {
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

    public void revokeAllUserTokens(UserEntity user) {
        List<TokenEntity> validUserTokens = tokenRepository.findByUserIdAndRevokedFalse(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token ->
                token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    public void revokeAllUserTokens(UserEntity user, TokenType tokenType) {
        List<TokenEntity> validUserTokens = tokenRepository.findByUserIdAndRevokedFalseAndType(user.getId(), tokenType);
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token ->
                token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    public void saveUserToken(UserEntity user, String accessToken, TokenType tokenType) {
        TokenEntity token = TokenEntity.builder()
                .userId(user.getId())
                .token(accessToken)
                .type(tokenType)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    public String getTokenFromCookies(HttpServletRequest request, String cookieName) {
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}