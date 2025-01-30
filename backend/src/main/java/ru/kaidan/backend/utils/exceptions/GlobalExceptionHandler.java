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
import ru.kaidan.backend.utils.exceptions.custom.ExpiredTokenException;
import ru.kaidan.backend.utils.exceptions.custom.InvalidTokenException;
import ru.kaidan.backend.utils.exceptions.custom.MissingTokenException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiExceptionResponse> handleUsernameNotFoundException(
            UsernameNotFoundException exception,
            HttpServletRequest request) {
        log.warn("User not found: {}", exception.getMessage());

        return buildResponse(
                HttpStatus.NOT_FOUND,
                "User not found",
                exception.getMessage(),
                request.getRequestURI());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiExceptionResponse> handleBadCredentialsException(
            BadCredentialsException exception,
            HttpServletRequest request) {
        log.info("Invalid login attempt: {}", exception.getMessage());

        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Invalid credentials",
                exception.getMessage(),
                request.getRequestURI());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiExceptionResponse> handleValidationException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request) {
        log.warn("Validation error on {}: {}", request.getRequestURI(), exception.getMessage());

        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Validation error",
                errors.toString(),
                request.getRequestURI());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiExceptionResponse> handleGenericException(Exception exception, HttpServletRequest request) {
        log.error("Unexpected error occurred: {}", exception.getMessage(), exception);

        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Unexpected error",
                exception.getMessage(),
                request.getRequestURI());
    }

    @ExceptionHandler(MissingTokenException.class)
    public ResponseEntity<ApiExceptionResponse> handleRefreshTokenMissing(
            MissingTokenException exception,
            HttpServletRequest request) {
        log.warn("Missing token: {}", exception.getMessage());

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Missing token",
                exception.getMessage(),
                request.getRequestURI());
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiExceptionResponse> handleInvalidRefreshToken(
            InvalidTokenException exception,
            HttpServletRequest request) {
        log.warn("Invalid token: {}", exception.getMessage());

        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Invalid token",
                exception.getMessage(),
                request.getRequestURI());
    }

    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<ApiExceptionResponse> handleInvalidRefreshToken(
            ExpiredTokenException exception,
            HttpServletRequest request) {
        log.warn("Expired token: {}", exception.getMessage());

        return buildResponse(
                HttpStatus.UNAUTHORIZED,
                "Expired token",
                exception.getMessage(),
                request.getRequestURI());
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