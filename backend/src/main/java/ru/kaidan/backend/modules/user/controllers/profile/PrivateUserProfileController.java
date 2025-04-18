package ru.kaidan.backend.modules.user.controllers.profile;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.user.DTO.UserProfileResponse;
import ru.kaidan.backend.modules.user.services.UserProfileService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/user/{userId}/profiles")
public class PrivateUserProfileController {
  private final UserProfileService userProfileService;

  @PostMapping("/username")
  public ResponseEntity<UserProfileResponse> updateUsername(
      @PathVariable String userId, @RequestBody String newUsername) {
    return ResponseEntity.ok().body(userProfileService.updateUsername(userId, newUsername));
  }

  @PostMapping("/bio")
  public ResponseEntity<UserProfileResponse> updateUserBio(
      @PathVariable String userId, @RequestBody String newBio) {
    return ResponseEntity.ok().body(userProfileService.updateUserBio(userId, newBio));
  }
}
