package ru.kaidan.backend.modules.review.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.review.DTO.ReviewCardDTO;
import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.entities.ReviewStatus;

@Component
@RequiredArgsConstructor
public class ReviewMapperImpl implements ReviewMapper {

  @Override
  public ReviewEntity DTOToEntity(ReviewRequest reviewRequest) {
    return ReviewEntity.builder()
        .title(reviewRequest.getTitle())
        .text(reviewRequest.getText())
        .userId(reviewRequest.getUserId())
        .userName(reviewRequest.getUserName())
        .animeId(reviewRequest.getAnimeId())
        .score(reviewRequest.getScore())
        .likes(0L)
        .dislikes(0L)
        .status(determineStatus(reviewRequest.getScore()))
        .createdAt(reviewRequest.getCreatedAt())
        .build();
  }

  @Override
  public ReviewCardDTO entitiesToDTO(ReviewEntity reviewEntity, Anime anime) {
    String banner;
    if (anime == null) banner = "";
    else if (anime.getCoverImage().getBanner() == null) {
      banner = "";
    } else {
      banner = anime.getCoverImage().getBanner();
    }
    return ReviewCardDTO.builder()
        .title(reviewEntity.getTitle())
        .text(reviewEntity.getText())
        .userId(reviewEntity.getUserId())
        .userName(reviewEntity.getUserName())
        .animeId(reviewEntity.getAnimeId())
        .animeBanner(banner)
        .score(reviewEntity.getScore())
        .likes(reviewEntity.getLikes())
        .dislikes(reviewEntity.getDislikes())
        .status(reviewEntity.getStatus())
        .createdAt(reviewEntity.getCreatedAt())
        .build();
  }

  private ReviewStatus determineStatus(int score) {
    if (score >= 7) {
      return ReviewStatus.POSITIVE;
    } else if (score <= 3) {
      return ReviewStatus.NEGATIVE;
    } else {
      return ReviewStatus.NEUTRAL;
    }
  }
}
