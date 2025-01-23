package ru.kaidan.backend.modules.user.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class UserEntity {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private RoleType role;
}