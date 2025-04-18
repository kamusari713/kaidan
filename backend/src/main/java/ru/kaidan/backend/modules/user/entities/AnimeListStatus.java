package ru.kaidan.backend.modules.user.entities;

import lombok.Getter;

@Getter
public enum AnimeListStatus {
  WATCHING,
  WATCHED,
  PLANNED,
  DROPPED,
  ON_HOLD
}
