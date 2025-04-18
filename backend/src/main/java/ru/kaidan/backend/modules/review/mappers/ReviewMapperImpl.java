package ru.kaidan.backend.modules.review.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;

@Component
@RequiredArgsConstructor
public class ReviewMapperImpl implements ReviewMapper {

  @Override
  public ReviewEntity dtoToEntity(ReviewRequest reviewRequest) {
    return ReviewEntity.builder()
        .text(reviewRequest.getText())
        .userId(reviewRequest.getUserId())
        .userName(reviewRequest.getUserName())
        .animeId(reviewRequest.getAnimeId())
        .score(reviewRequest.getScore())
        .likes(0L)
        .dislikes(0L)
        .createdAt(reviewRequest.getCreatedAt())
        .build();
  }
}
