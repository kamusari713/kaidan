package ru.kaidan.backend.modules.user.DTO;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserProfileResponse {
  private String username;
  private String bio;
  private boolean banned;
}
