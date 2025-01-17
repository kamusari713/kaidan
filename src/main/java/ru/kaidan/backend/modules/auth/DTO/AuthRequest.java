package ru.kaidan.backend.modules.auth.DTO;

import lombok.Data;

@Data
public class AuthRequest {
    private String usernameOrEmail;
    private String password;
}