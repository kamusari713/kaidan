package ru.kaidan.backend.modules.anime.entities;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import ru.kaidan.backend.modules.anime.entities.types.TagTranslation;

@Data
@Document("tags")
public class Tag {

  private TagTranslation EN;
  private TagTranslation RU;
  private Integer rank;
  private Boolean isSpoiler;
}
