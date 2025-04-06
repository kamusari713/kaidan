package ru.kaidan.backend.modules.comment.entities;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document("comments")
public class CommentEntity {

  @Id private String id;
  private String userId;
  private String userName;
  private String parentId;
  private String text;
  private Instant createdAt;

  private String reviewId;
  private String animeId;

  private List<CommentEntity> children = new ArrayList<>();
}
