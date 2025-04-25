package ru.kaidan.backend.modules.user.services;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.auth.custom.CustomUserDetails;
import ru.kaidan.backend.modules.auth.services.JwtService;
import ru.kaidan.backend.modules.user.DTO.UserProfileResponse;
import ru.kaidan.backend.modules.user.DTO.UserUpdateRequest;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {
  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final StringRedisTemplate stringRedisTemplate;

  @Value("${jwt.accessToken.expiration}")
  private Long accessExpiration;

  public UserProfileResponse findUserProfile(String userId) {
    UserEntity userEntity = userRepository.findById(userId).orElse(null);
    if (userEntity == null) {
      return null;
    }
    return UserProfileResponse.builder()
        .username(userEntity.getUsername())
        .bio(userEntity.getBio())
        .banned(userEntity.getBanned())
        .build();
  }

  public CookieResponse updateUserProfile(String userId, UserUpdateRequest userProfileDto) {
    UserEntity userEntity = userRepository.findById(userId).orElse(null);
    assert userEntity != null;
    userEntity.setBio(userProfileDto.getNewBio());
    userEntity.setUsername(userProfileDto.getNewUsername());
    userRepository.save(userEntity);

    CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);
    String accessToken = jwtService.generateAccessToken(customUserDetails);
    String refreshToken = jwtService.generateRefreshToken(customUserDetails);
    jwtService.revokeAllUserTokens(userEntity);
    stringRedisTemplate
        .opsForValue()
        .set(userEntity.getUsername(), accessToken, accessExpiration, TimeUnit.MILLISECONDS);
    jwtService.saveUserToken(userEntity, refreshToken);
    return jwtService.buildTokensCookies(accessToken, refreshToken);
  }
}
