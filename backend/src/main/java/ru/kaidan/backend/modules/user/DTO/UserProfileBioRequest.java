package ru.kaidan.backend.modules.user.DTO;

import lombok.Data;

@Data
public class UserProfileBioRequest {
  private String userId;
  private String newBio;
}
