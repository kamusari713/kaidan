package ru.kaidan.backend.modules.comment.DTO;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentCardDTO {
  private String id;
  private String userId;
  private String animeId;
  private String animeTitle;
  private String createdAt;
  private String parentId;
  private String reviewId;
  private String text;
  private String userName;
  private List<CommentCardDTO> children;
}
