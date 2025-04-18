package ru.kaidan.backend.utils.exceptions.custom;

import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException {
  private final String code = "VALIDATION_ERROR";

  public ValidationException(String message) {
    super(message);
  }
}
