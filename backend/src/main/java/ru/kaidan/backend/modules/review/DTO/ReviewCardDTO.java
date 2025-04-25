package ru.kaidan.backend.modules.review.DTO;

import java.time.Instant;
import lombok.Builder;
import lombok.Data;
import ru.kaidan.backend.modules.review.entities.ReviewStatus;

@Builder
@Data
public class ReviewCardDTO {

  private String title;
  private String text;
  private String userId;
  private String userName;
  private String animeId;
  private String animeBanner;
  private Integer score;
  private ReviewStatus status;
  private Long likes;
  private Long dislikes;
  private Instant createdAt;
}
