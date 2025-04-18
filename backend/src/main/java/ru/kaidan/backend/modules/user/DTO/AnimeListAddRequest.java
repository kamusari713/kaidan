package ru.kaidan.backend.modules.user.DTO;

import lombok.Data;
import ru.kaidan.backend.modules.user.entities.AnimeListStatus;

@Data
public class AnimeListAddRequest {
  private AnimeListStatus status;
}
