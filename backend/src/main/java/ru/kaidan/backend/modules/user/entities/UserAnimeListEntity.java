package ru.kaidan.backend.modules.user.entities;

import java.time.Instant;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("user_anime_lists")
public class UserAnimeListEntity {
  @Id private String id;

  private String userId;
  private String animeId;

  private AnimeListStatus status;

  private Instant createdAt = Instant.now();
  private Instant updatedAt = Instant.now();
}
