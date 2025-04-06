package ru.kaidan.backend.modules.user.DTO;

import lombok.Data;

@Data
public class UserProfileUsernameRequest {
  private String userId;
  private String newUsername;
}
