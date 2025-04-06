package ru.kaidan.backend.modules.user.entities;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.Arrays;
import java.util.Optional;

@Getter
public enum AnimeListStatus {
  WATCHING("Смотрю"),
  WATCHED("Просмотрено"),
  PLANNED("Планирую"),
  DROPPED("Брошено"),
  ON_HOLD("Отложено");

  private final String displayName;

  AnimeListStatus(String displayName) {
    this.displayName = displayName;
  }

  public static Optional<AnimeListStatus> fromDisplayName(String name) {
    return Arrays.stream(values())
        .filter(status -> status.displayName.equalsIgnoreCase(name))
        .findFirst();
  }

  @JsonValue
  public String getDisplayName() {
    return displayName;
  }
}
