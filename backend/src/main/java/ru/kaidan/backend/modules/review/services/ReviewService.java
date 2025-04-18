package ru.kaidan.backend.modules.review.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.repositories.AnimeRepository;
import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.entities.ReviewVoteEntity;
import ru.kaidan.backend.modules.review.entities.ReviewVoteType;
import ru.kaidan.backend.modules.review.mappers.ReviewMapper;
import ru.kaidan.backend.modules.review.repositories.ReviewRepository;
import ru.kaidan.backend.modules.review.repositories.ReviewVoteRepository;

@Service
@RequiredArgsConstructor
public class ReviewService {

  private final ReviewRepository reviewRepository;
  private final ReviewVoteRepository reviewVoteRepository;
  private final ReviewMapper reviewMapper;
  private final AnimeRepository animeRepository;

  public List<ReviewEntity> findByAnime(String animeId) {
    return reviewRepository.findByAnimeId(animeId);
  }

  public List<ReviewEntity> findByUserIdAndAnimeId(String userId, String animeId) {
    List<ReviewEntity> reviews = reviewRepository.findByAnimeId(animeId);

    if (userId != null && !userId.isBlank()) {
      List<ReviewVoteEntity> votes =
          reviewVoteRepository.findByUserIdAndReviewIdIn(
              userId, reviews.stream().map(ReviewEntity::getId).toList());

      Map<String, ReviewVoteType> voteMap =
          votes.stream()
              .collect(Collectors.toMap(ReviewVoteEntity::getReviewId, ReviewVoteEntity::getVote));

      for (ReviewEntity review : reviews) {
        review.setUserVote(voteMap.get(review.getId()));
      }
    }

    return reviews;
  }

  public List<ReviewEntity> findByUser(String userId) {
    return reviewRepository.findByUserId(userId);
  }

  public ReviewEntity createReview(ReviewRequest reviewRequest) {
    ReviewEntity newEntity = reviewMapper.dtoToEntity(reviewRequest);
    Anime animeEntity =
        animeRepository
            .findByShikimoriId(reviewRequest.getAnimeId())
            .orElseThrow(() -> new RuntimeException("Anime not found"));
    System.out.println(animeEntity.getAverageScore());
    updateAnimeRating(animeEntity, reviewRequest.getScore());
    System.out.println(animeEntity.getAverageScore());
    return reviewRepository.save(newEntity);
  }

  private void updateAnimeRating(Anime anime, int newReviewRating) {
    int currentReviewsCount = anime.getScoreCount() != null ? anime.getScoreCount() : 0;
    double currentAverageRating = anime.getAverageScore() != null ? anime.getAverageScore() : 0.0;

    double newAverageRating =
        (currentAverageRating * currentReviewsCount + newReviewRating) / (currentReviewsCount + 1);

    anime.setScoreCount(currentReviewsCount + 1);
    anime.setAverageScore(newAverageRating);

    animeRepository.save(anime);
  }

  public Page<ReviewEntity> getReviewsWithPagination(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
    return reviewRepository.findAllByOrderByCreatedAtDesc(pageable);
  }
}
