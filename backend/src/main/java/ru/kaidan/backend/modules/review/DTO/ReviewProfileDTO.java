package ru.kaidan.backend.modules.review.DTO;

import java.time.Instant;
import lombok.Builder;
import lombok.Data;
import ru.kaidan.backend.modules.review.entities.ReviewStatus;
import ru.kaidan.backend.modules.review.entities.ReviewVoteType;

@Builder
@Data
public class ReviewProfileDTO {

  private String id;
  private String title;
  private String text;
  private String userId;
  private String userName;
  private String animeId;
  private String animeName;
  private Instant createdAt;
  private Integer score;
  private Long likes;
  private Long dislikes;
  private ReviewStatus status;
  private ReviewVoteType userVote;
}
