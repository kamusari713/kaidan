package ru.kaidan.backend.modules.review.entities;

import java.time.Instant;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document("review_votes")
@CompoundIndex(def = "{'userId': 1, 'reviewId': 1}", unique = true)
public class ReviewVoteEntity {
  @Id private String id;
  private String userId;
  private String reviewId;

  private ReviewVoteType vote;
  private Instant createdAt;
}
