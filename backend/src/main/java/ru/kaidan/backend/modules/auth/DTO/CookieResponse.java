package ru.kaidan.backend.modules.auth.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseCookie;

@Data
@AllArgsConstructor
public class CookieResponse {
    private ResponseCookie accessCookie;
    private ResponseCookie refreshCookie;
}
