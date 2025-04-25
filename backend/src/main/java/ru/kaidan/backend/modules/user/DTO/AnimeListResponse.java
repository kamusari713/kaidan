package ru.kaidan.backend.modules.user.DTO;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;
import ru.kaidan.backend.modules.user.entities.AnimeListStatus;

@Builder
@Data
public class AnimeListResponse {
  private String userId;
  private String animeId;
  private String title;
  private AnimeListStatus status;
  private LocalDate createdAt;
  private LocalDate updatedAt;
  private String image;
}
