package ru.kaidan.backend.modules.auth.DTO;

import org.springframework.data.annotation.Id;

import lombok.Builder;
import lombok.Data;
import ru.kaidan.backend.modules.user.entities.RoleType;

@Data
@Builder
public class UserCredentials {

    @Id
    private String id;
    private String username;
    private String email;
    private RoleType role;
}
