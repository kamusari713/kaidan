package ru.kaidan.backend.modules.user.controllers.profile;

import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.auth.DTO.CookieResponse;
import ru.kaidan.backend.modules.user.DTO.UserUpdateRequest;
import ru.kaidan.backend.modules.user.services.UserProfileService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/user/{userId}/profiles")
public class PrivateUserProfileController {
  private final UserProfileService userProfileService;

  @PostMapping
  public ResponseEntity<Null> updateUsername(
      @PathVariable String userId, @RequestBody UserUpdateRequest userProfileDto) {
    CookieResponse cookies = userProfileService.updateUserProfile(userId, userProfileDto);
    return ResponseEntity.noContent()
        .header(HttpHeaders.SET_COOKIE, cookies.getAccessCookie().toString())
        .header(HttpHeaders.SET_COOKIE, cookies.getRefreshCookie().toString())
        .build();
  }
}
