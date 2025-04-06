package ru.kaidan.backend.modules.review.entities;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document("reviews")
public class ReviewEntity {

  @Id private String id;
  private String text;
  private String userId;
  private String userName;
  private String animeId;
  private Instant createdAt;

  private Integer score;

  private Long likes;
  private Long dislikes;

  @Transient private ReviewVoteType userVote;
}
