package ru.kaidan.backend.modules.auth.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String usernameOrEmail;
    private String password;
}