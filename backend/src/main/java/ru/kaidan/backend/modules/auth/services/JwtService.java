package ru.kaidan.backend.modules.auth.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.entities.TokenEntity;
import ru.kaidan.backend.modules.auth.entities.TokenType;
import ru.kaidan.backend.modules.auth.repositories.TokenRepository;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.utils.exceptions.custom.InvalidTokenException;

@Component
@RequiredArgsConstructor
public class JwtService {

    private final TokenRepository tokenRepository;
    private final CookieService cookieService;
    @Value("${jwt.accessToken.cookie-name}")
    public String accessCookieName;
    @Value("${jwt.refreshToken.cookie-name}")
    public String refreshCookieName;
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.accessToken.expiration}")
    private long accessTokenExpiration;
    @Value("${jwt.refreshToken.expiration}")
    private long refreshTokenExpiration;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(String token) {
        String name = extractAllClaims(token).getSubject();
        if (name == null) {
            throw new InvalidTokenException("Token is invalid");
        }
        return name;
    }

    public String buildToken(String subject, long expiration) {
        return Jwts
                .builder()
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), Jwts.SIG.HS256)
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

    public CookieResponse buildTokensCookies(String accessToken, String refreshToken) {
        return CookieResponse.builder()
                .accessCookie(cookieService.createCookie(
                        accessCookieName,
                        accessToken,
                        accessTokenExpiration
                ))
                .refreshCookie(cookieService.createCookie(
                        refreshCookieName,
                        refreshToken,
                        refreshTokenExpiration
                ))
                .build();
    }

    public void revokeAllUserTokens(UserEntity user) {
        List<TokenEntity> validUserTokens = tokenRepository.findByUserIdAndRevokedFalse(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token
                -> token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    public void revokeAllUserTokens(UserEntity user, TokenType tokenType) {
        List<TokenEntity> validUserTokens = tokenRepository.findByUserIdAndRevokedFalseAndType(user.getId(), tokenType);
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token
                -> token.setRevoked(true));
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
}
