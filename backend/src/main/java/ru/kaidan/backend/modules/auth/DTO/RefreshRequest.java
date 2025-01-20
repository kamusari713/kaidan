package ru.kaidan.backend.modules.auth.DTO;

import lombok.Data;

@Data
public class RefreshRequest {
    private String refreshToken;
}
