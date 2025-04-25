package ru.kaidan.backend.modules.user.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.auth.DTO.RegisterRequest;
import ru.kaidan.backend.modules.user.DTO.UserDTO;
import ru.kaidan.backend.modules.user.entities.RoleType;
import ru.kaidan.backend.modules.user.entities.UserEntity;
import ru.kaidan.backend.modules.user.repositories.UserRepository;
import ru.kaidan.backend.utils.exceptions.custom.NotFoundException;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public Page<UserDTO> getAllUsers(Integer page, Integer size, String orderBy, Boolean direction) {
    Sort sortMethod;
    if (direction) {
      sortMethod = Sort.by(orderBy).descending();
    } else {
      sortMethod = Sort.by(orderBy).ascending();
    }
    Pageable pageable = PageRequest.of(page, size, sortMethod);
    Page<UserEntity> userEntityPage = userRepository.findAll(pageable);
    return userEntityPage.map(
        user ->
            UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .bio(user.getBio())
                .role(user.getRole())
                .banned(user.getBanned())
                .build());
  }

  public UserDTO createUser(RegisterRequest createRequest) {
    UserEntity userEntity =
        UserEntity.builder()
            .username(createRequest.getUsername())
            .password(passwordEncoder.encode(createRequest.getPassword()))
            .email(createRequest.getEmail())
            .bio("")
            .role(RoleType.ROLE_USER)
            .banned(false)
            .build();
    userRepository.save(userEntity);
    return UserDTO.builder()
        .id(userEntity.getId())
        .username(userEntity.getUsername())
        .email(userEntity.getEmail())
        .bio(userEntity.getBio())
        .role(userEntity.getRole())
        .banned(userEntity.getBanned())
        .build();
  }

  public void banUser(String userId, boolean banned) {
    UserEntity userEntity =
        userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
    userEntity.setBanned(banned);
    userRepository.save(userEntity);
  }

  public UserDTO updateUser(String userId, UserDTO updateRequest) {
    UserEntity userEntity =
        userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
    userEntity.setId(updateRequest.getId());
    userEntity.setUsername(updateRequest.getUsername());
    userEntity.setEmail(updateRequest.getEmail());
    userEntity.setRole(updateRequest.getRole());
    userEntity.setBio(updateRequest.getBio());
    userEntity.setBanned(updateRequest.getBanned());
    userRepository.save(userEntity);
    return updateRequest;
  }
}
