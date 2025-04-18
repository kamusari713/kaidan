package ru.kaidan.backend.utils.exceptions.custom;

import lombok.Getter;

@Getter
public class ConflictException extends RuntimeException {
  private final String code = "CONFLICT";

  public ConflictException(String message) {
    super(message);
  }
}
