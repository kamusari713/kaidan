package ru.kaidan.backend.modules.anime.entities.types;

import lombok.Data;

@Data
public class Sort {
  private String orderBy;
  private String direction;
}
