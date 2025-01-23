package ru.kaidan.backend.modules.auth.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}