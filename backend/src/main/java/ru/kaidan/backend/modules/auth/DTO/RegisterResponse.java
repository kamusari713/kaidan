package ru.kaidan.backend.modules.auth.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private String accessToken;
    private String refreshToken;
}
