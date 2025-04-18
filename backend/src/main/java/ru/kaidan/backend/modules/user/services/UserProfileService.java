package ru.kaidan.backend.modules.user.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.user.DTO.UserProfileResponse;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {
  private final UserRepository userRepository;

  public UserProfileResponse updateUsername(String userId, String newUsername) {

    UserEntity userEntity = userRepository.findById(userId).orElse(null);
    assert userEntity != null;
    userEntity.setUsername(newUsername);
    userRepository.save(userEntity);
    return UserProfileResponse.builder().username(newUsername).bio(userEntity.getBio()).build();
  }

  public UserProfileResponse updateUserBio(String userId, String newBio) {
    UserEntity userEntity = userRepository.findById(userId).orElse(null);
    assert userEntity != null;
    userEntity.setBio(newBio);
    userRepository.save(userEntity);
    return UserProfileResponse.builder().username(userEntity.getUsername()).bio(newBio).build();
  }

  public UserProfileResponse findUserProfile(String userId) {
    UserEntity userEntity = userRepository.findById(userId).orElse(null);
    if (userEntity == null) {
      return null;
    }
    return UserProfileResponse.builder()
        .username(userEntity.getUsername())
        .bio(userEntity.getBio())
        .build();
  }
}
