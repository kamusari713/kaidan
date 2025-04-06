package ru.kaidan.backend.modules.review.DTO;

import java.time.Instant;
import lombok.Data;
import ru.kaidan.backend.modules.review.entities.ReviewVoteType;

@Data
public class ReviewVoteRequest {
  private String userId;
  private String reviewId;
  private ReviewVoteType vote;
  private Instant createdAt;
}
