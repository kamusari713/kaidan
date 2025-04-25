package ru.kaidan.backend.modules.user.entities;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document("user_anime_lists")
public class UserAnimeListEntity {
  @Id private String id;

  private String userId;
  private String shikimoriId;

  private AnimeListStatus status;

  private LocalDate createdAt;
  private LocalDate updatedAt;
}
