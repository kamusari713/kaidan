package ru.kaidan.backend.utils.exceptions.custom;

import lombok.Getter;

@Getter
public class MissingTokenException extends RuntimeException {
  private final String code = "MISSING_TOKEN";

  public MissingTokenException(String message) {
    super(message);
  }
}
