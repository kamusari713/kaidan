package ru.kaidan.backend.modules.review.DTO;

import java.time.Instant;
import lombok.Data;

@Data
public class ReviewRequest {

  private String title;
  private String text;
  private String userId;
  private String userName;
  private String animeId;
  private Integer score;
  private Instant createdAt;
}
