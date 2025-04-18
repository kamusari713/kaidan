package ru.kaidan.backend.utils.exceptions.custom;

import lombok.Getter;

@Getter
public class ExpiredTokenException extends RuntimeException {
  private final String code = "EXPIRED_TOKEN";

  public ExpiredTokenException(String message) {
    super(message);
  }
}
