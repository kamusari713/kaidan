package ru.kaidan.backend.utils.exceptions.custom;

import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException {
  private final String code = "NOT_FOUND";

  public NotFoundException(String message) {
    super(message);
  }
}
