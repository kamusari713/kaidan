package ru.kaidan.backend.modules.review.mappers;

import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;

public interface ReviewMapper {

  ReviewEntity dtoToEntity(ReviewRequest reviewRequest);
}
