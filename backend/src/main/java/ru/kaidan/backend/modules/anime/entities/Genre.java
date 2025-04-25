package ru.kaidan.backend.modules.anime.entities;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("genres")
public class Genre {

  private String EN;
  private String RU;
}
