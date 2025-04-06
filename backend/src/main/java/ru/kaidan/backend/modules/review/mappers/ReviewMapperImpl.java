package ru.kaidan.backend.modules.review.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.repositories.ReviewRepository;

@Component
@RequiredArgsConstructor
public class ReviewMapperImpl implements ReviewMapper {

  private final ReviewRepository reviewRepository;

  @Override
  public ReviewEntity dtoToEntity(ReviewRequest reviewRequest) {
    ReviewEntity reviewEntity =
        ReviewEntity.builder()
            .text(reviewRequest.getText())
            .userId(reviewRequest.getUserId())
            .userName(reviewRequest.getUserName())
            .animeId(reviewRequest.getAnimeId())
            .score(reviewRequest.getScore())
            .likes(0L)
            .dislikes(0L)
            .createdAt(reviewRequest.getCreatedAt())
            .build();
    return reviewRepository.save(reviewEntity);
  }
}
