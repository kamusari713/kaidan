package ru.kaidan.backend.modules.user.DTO;

import lombok.Builder;
import lombok.Data;
import ru.kaidan.backend.modules.user.entities.RoleType;

@Builder
@Data
public class UserDTO {
  private String id;
  private String username;
  private String email;
  private String bio;
  private RoleType role;
  private Boolean banned;
}
