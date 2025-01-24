package ru.kaidan.backend.utils.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.kaidan.backend.utils.exceptions.custom.ExpiredRefreshToken;
import ru.kaidan.backend.utils.exceptions.custom.InvalidRefreshTokenException;
import ru.kaidan.backend.utils.exceptions.custom.RefreshTokenMissingException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiExceptionResponse> handleUsernameNotFoundException(
            UsernameNotFoundException ex,
            HttpServletRequest request) {
        log.warn("User not found: {}", ex.getMessage());

        return buildResponse(
                HttpStatus.NOT_FOUND,
                "User not found", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiExceptionResponse> handleBadCredentialsException(
            BadCredentialsException ex,
            HttpServletRequest request) {
        log.info("Invalid login attempt: {}", ex.getMessage());

        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Invalid credentials", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiExceptionResponse> handleValidationException(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        log.warn("Validation error on {}: {}", request.getRequestURI(), ex.getMessage());

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Validation error", errors.toString(), request.getRequestURI());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiExceptionResponse> handleGenericException(Exception ex, HttpServletRequest request) {
        log.error("Unexpected error occurred: {}", ex.getMessage(), ex);

        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Unexpected error", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(RefreshTokenMissingException.class)
    public ResponseEntity<ApiExceptionResponse> handleRefreshTokenMissing(
            RefreshTokenMissingException ex,
            HttpServletRequest request) {
        log.warn("Refresh token missing: {}", ex.getMessage());

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Refresh token error", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<ApiExceptionResponse> handleInvalidRefreshToken(
            InvalidRefreshTokenException ex,
            HttpServletRequest request) {
        log.warn("Invalid refresh token: {}", ex.getMessage());

        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Invalid refresh token", ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(ExpiredRefreshToken.class)
    public ResponseEntity<ApiExceptionResponse> handleInvalidRefreshToken(
            ExpiredRefreshToken ex,
            HttpServletRequest request) {
        log.warn("Expired refresh token: {}", ex.getMessage());

        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Expired refresh token", ex.getMessage(), request.getRequestURI());
    }

    private ResponseEntity<ApiExceptionResponse> buildResponse(
            HttpStatus status,
            String error,
            String message,
            String path) {
        ApiExceptionResponse apiException = new ApiExceptionResponse(
                LocalDateTime.now(),
                status.value(),
                error,
                message,
                path
        );

        return ResponseEntity.status(status).body(apiException);
    }
}