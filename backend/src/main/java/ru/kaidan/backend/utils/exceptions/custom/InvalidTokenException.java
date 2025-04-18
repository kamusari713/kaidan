package ru.kaidan.backend.utils.exceptions.custom;

import lombok.Getter;

@Getter
public class InvalidTokenException extends RuntimeException {
  private final String code = "INVALID_TOKEN";

  public InvalidTokenException(String message) {
    super(message);
  }
}
