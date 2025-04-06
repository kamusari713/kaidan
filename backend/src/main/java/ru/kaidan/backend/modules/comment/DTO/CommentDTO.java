package ru.kaidan.backend.modules.comment.DTO;

import java.time.Instant;
import lombok.Data;

@Data
public class CommentDTO {
  private String text;
  private String userId;
  private String userName;
  private String parentId;
  private Instant createdAt;
  private String animeId;
  private String reviewId;
}
