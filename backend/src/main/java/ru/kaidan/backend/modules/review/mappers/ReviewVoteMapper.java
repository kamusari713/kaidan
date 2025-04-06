package ru.kaidan.backend.modules.review.mappers;

import ru.kaidan.backend.modules.review.DTO.ReviewVoteRequest;
import ru.kaidan.backend.modules.review.entities.ReviewVoteEntity;

public interface ReviewVoteMapper {
  ReviewVoteEntity dtoToEntity(ReviewVoteRequest reviewVoteRequest);
}
