package ru.kaidan.backend.utils.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.kaidan.backend.utils.exceptions.custom.*;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(
      UsernameNotFoundException exception, HttpServletRequest request) {
    log.warn("User not found: {}", exception.getMessage());
    return buildErrorResponse(
        HttpStatus.NOT_FOUND,
        "NOT_FOUND",
        "Пользователь не найден: " + exception.getMessage(),
        request.getRequestURI());
  }

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ErrorResponse> handleNotFoundException(
      NotFoundException exception, HttpServletRequest request) {
    log.warn("Resource not found: {}", exception.getMessage());
    return buildErrorResponse(
        HttpStatus.NOT_FOUND,
        exception.getCode(),
        "Ресурс не найден: " + exception.getMessage(),
        request.getRequestURI());
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ErrorResponse> handleBadCredentialsException(
      BadCredentialsException exception, HttpServletRequest request) {
    log.info("Invalid login attempt: {}", exception.getMessage());
    return buildErrorResponse(
        HttpStatus.UNAUTHORIZED,
        "INVALID_CREDENTIALS",
        "Неверные учетные данные: " + exception.getMessage(),
        request.getRequestURI());
  }

  @ExceptionHandler(ValidationException.class)
  public ResponseEntity<ErrorResponse> handleCustomValidationException(
      ValidationException exception, HttpServletRequest request) {
    log.warn("Validation error: {}", exception.getMessage());
    return buildErrorResponse(
        HttpStatus.BAD_REQUEST,
        exception.getCode(),
        "Ошибка валидации: " + exception.getMessage(),
        request.getRequestURI());
  }

  @ExceptionHandler(ConflictException.class)
  public ResponseEntity<ErrorResponse> handleConflictException(
      ConflictException exception, HttpServletRequest request) {
    log.warn("Conflict: {}", exception.getMessage());
    return buildErrorResponse(
        HttpStatus.CONFLICT,
        exception.getCode(),
        "Конфликт: " + exception.getMessage(),
        request.getRequestURI());
  }

  @ExceptionHandler(MissingTokenException.class)
  public ResponseEntity<ErrorResponse> handleRefreshTokenMissing(
      MissingTokenException exception, HttpServletRequest request) {
    log.warn("Missing token: {}", exception.getMessage());
    return buildErrorResponse(
        HttpStatus.BAD_REQUEST,
        exception.getCode(),
        "Токен отсутствует: " + exception.getMessage(),
        request.getRequestURI());
  }

  @ExceptionHandler(InvalidTokenException.class)
  public ResponseEntity<ErrorResponse> handleInvalidRefreshToken(
      InvalidTokenException exception, HttpServletRequest request) {
    log.warn("Invalid token: {}", exception.getMessage());
    return buildErrorResponse(
        HttpStatus.UNAUTHORIZED,
        exception.getCode(),
        "Неверный токен: " + exception.getMessage(),
        request.getRequestURI());
  }

  @ExceptionHandler(ExpiredTokenException.class)
  public ResponseEntity<ErrorResponse> handleExpiredRefreshToken(
      ExpiredTokenException exception, HttpServletRequest request) {
    log.warn("Expired token: {}", exception.getMessage());
    return buildErrorResponse(
        HttpStatus.UNAUTHORIZED,
        exception.getCode(),
        "Токен истёк: " + exception.getMessage(),
        request.getRequestURI());
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> handleGenericException(
      Exception exception, HttpServletRequest request) {
    log.error(
        "Unexpected error occurred on {}: {}", request.getRequestURI(), exception.getMessage());
    return buildErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "SERVER_ERROR",
        "Внутренняя ошибка сервера",
        request.getRequestURI());
  }

  private ResponseEntity<ErrorResponse> buildErrorResponse(
      HttpStatus status, String code, String message, String path) {
    ErrorResponse responseBody =
        ErrorResponse.builder().code(code).message(message).path(path).build();
    return ResponseEntity.status(status).body(responseBody);
  }
}
