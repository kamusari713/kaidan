package ru.kaidan.backend.modules.review.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.kaidan.backend.modules.review.DTO.ReviewVoteRequest;
import ru.kaidan.backend.modules.review.entities.ReviewVoteEntity;
import ru.kaidan.backend.modules.review.repositories.ReviewVoteRepository;

@Component
@RequiredArgsConstructor
public class ReviewVoteMapperImpl implements ReviewVoteMapper {

  private final ReviewVoteRepository reviewVoteRepository;

  @Override
  public ReviewVoteEntity dtoToEntity(ReviewVoteRequest reviewVoteRequest) {
    ReviewVoteEntity reviewVoteEntity =
        ReviewVoteEntity.builder()
            .userId(reviewVoteRequest.getUserId())
            .reviewId(reviewVoteRequest.getReviewId())
            .createdAt(reviewVoteRequest.getCreatedAt())
            .vote(reviewVoteRequest.getVote())
            .build();
    return reviewVoteRepository.save(reviewVoteEntity);
  }
}
