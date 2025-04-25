package ru.kaidan.backend.modules.user.entities;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document("users")
public class UserEntity {

  @Id private String id;
  private String username;
  private String email;
  private String password;
  private String bio;
  private RoleType role;
  private Boolean banned;
}
