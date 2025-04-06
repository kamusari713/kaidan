package ru.kaidan.backend.modules.user.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.user.DTO.UserProfileBioRequest;
import ru.kaidan.backend.modules.user.DTO.UserProfileResponse;
import ru.kaidan.backend.modules.user.DTO.UserProfileUsernameRequest;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {
  private final UserRepository userRepository;

  public UserProfileResponse updateUsername(UserProfileUsernameRequest usernameRequest) {

    UserEntity userEntity = userRepository.findById(usernameRequest.getUserId()).orElse(null);
    assert userEntity != null;
    userEntity.setUsername(usernameRequest.getNewUsername());
    userRepository.save(userEntity);
    return UserProfileResponse.builder()
        .username(usernameRequest.getNewUsername())
        .bio(userEntity.getBio())
        .build();
  }

  public UserProfileResponse updateUserBio(UserProfileBioRequest bioRequest) {
    UserEntity userEntity = userRepository.findById(bioRequest.getUserId()).orElse(null);
    assert userEntity != null;
    userEntity.setBio(bioRequest.getNewBio());
    userRepository.save(userEntity);
    return UserProfileResponse.builder()
        .username(userEntity.getUsername())
        .bio(bioRequest.getNewBio())
        .build();
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
