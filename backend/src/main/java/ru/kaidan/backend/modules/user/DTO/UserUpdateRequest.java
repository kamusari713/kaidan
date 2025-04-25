package ru.kaidan.backend.modules.user.DTO;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserUpdateRequest {
  private String newUsername;
  private String newBio;
}
