package ru.kaidan.backend.modules.comment.mappers;

import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.kaidan.backend.modules.comment.DTO.CommentDTO;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;

@Component
@RequiredArgsConstructor
public class CommentMapperImpl implements CommentMapper {

  @Override
  public CommentEntity dtoToEntity(CommentDTO commentDTO) {
    return CommentEntity.builder()
        .text(commentDTO.getText())
        .userId(commentDTO.getUserId())
        .userName(commentDTO.getUserName())
        .parentId(commentDTO.getParentId())
        .animeId(commentDTO.getAnimeId())
        .reviewId(commentDTO.getReviewId())
        .createdAt(commentDTO.getCreatedAt())
        .children(new ArrayList<>())
        .build();
  }
}
