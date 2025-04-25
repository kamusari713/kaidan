package ru.kaidan.backend.modules.review.mappers;

import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.review.DTO.ReviewCardDTO;
import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;

public interface ReviewMapper {

  ReviewEntity DTOToEntity(ReviewRequest reviewRequest);

  ReviewCardDTO entitiesToDTO(ReviewEntity reviewEntity, Anime anime);
}
