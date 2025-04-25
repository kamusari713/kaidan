package ru.kaidan.backend.modules.review.services;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.repositories.AnimeRepository;
import ru.kaidan.backend.modules.anime.services.AnimeService;
import ru.kaidan.backend.modules.review.DTO.ReviewCardDTO;
import ru.kaidan.backend.modules.review.DTO.ReviewProfileDTO;
import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.entities.ReviewVoteType;
import ru.kaidan.backend.modules.review.mappers.ReviewMapper;
import ru.kaidan.backend.modules.review.repositories.ReviewRepository;

@Service
@RequiredArgsConstructor
public class ReviewService {

  private final ReviewRepository reviewRepository;
  private final ReviewVoteService reviewVoteService;
  private final ReviewMapper reviewMapper;
  private final AnimeRepository animeRepository;
  private final AnimeService animeService;

  public List<ReviewEntity> findByAnime(String animeId) {
    return reviewRepository.findByAnimeId(animeId);
  }

  public List<ReviewProfileDTO> findByUserId(String userId) {
    List<ReviewEntity> reviews = reviewRepository.findByUserId(userId);
    return convertToDTOs(reviews);
  }

  public List<ReviewEntity> findByUserIdAndAnimeId(String currentUserId, String animeId) {
    List<ReviewEntity> reviews = reviewRepository.findByAnimeId(animeId);

    if (reviews.isEmpty()) return reviews;

    return buildVotedReviewsResponse(currentUserId, reviews);
  }

  public List<ReviewProfileDTO> findByUserId(String currentUserId, String userId) {
    List<ReviewEntity> reviews = reviewRepository.findByUserId(userId);

    List<ReviewProfileDTO> reviewProfileDTOS = convertToDTOs(reviews);

    if (reviews.isEmpty()) return reviewProfileDTOS;

    return buildVotedProfileReviewsResponse(currentUserId, reviewProfileDTOS);
  }

  public ReviewEntity createReview(ReviewRequest reviewRequest) {
    ReviewEntity newEntity = reviewMapper.DTOToEntity(reviewRequest);
    Anime animeEntity =
        animeRepository
            .findByShikimoriId(reviewRequest.getAnimeId())
            .orElseThrow(() -> new RuntimeException("Anime not found"));
    updateAnimeRating(animeEntity, reviewRequest.getScore());
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

  public List<ReviewCardDTO> getRecentReviews() {
    List<ReviewEntity> reviews =
        reviewRepository.findAllByOrderByCreatedAtDesc().stream().limit(8).toList();

    Set<String> animeShikimoriIds =
        reviews.stream().map(ReviewEntity::getAnimeId).collect(Collectors.toSet());

    Map<String, Anime> animeMap =
        animeRepository.findByShikimoriIdIn(animeShikimoriIds).stream()
            .collect(Collectors.toMap(Anime::getShikimoriId, anime -> anime));

    return reviews.stream()
        .map(
            review -> {
              Anime anime = animeMap.get(review.getAnimeId());
              return reviewMapper.entitiesToDTO(review, anime);
            })
        .toList();
  }

  public List<ReviewEntity> buildVotedReviewsResponse(String userId, List<ReviewEntity> reviews) {
    List<String> reviewIds = reviews.stream().map(ReviewEntity::getId).collect(Collectors.toList());

    Map<String, ReviewVoteType> userVotes =
        reviewVoteService.findVotesByUserAndReviews(userId, reviewIds);

    reviews.forEach(review -> review.setUserVote(userVotes.getOrDefault(review.getId(), null)));

    return reviews;
  }

  public List<ReviewProfileDTO> buildVotedProfileReviewsResponse(
      String userId, List<ReviewProfileDTO> reviews) {
    List<String> reviewIds =
        reviews.stream().map(ReviewProfileDTO::getId).collect(Collectors.toList());

    Map<String, ReviewVoteType> userVotes =
        reviewVoteService.findVotesByUserAndReviews(userId, reviewIds);

    reviews.forEach(review -> review.setUserVote(userVotes.getOrDefault(review.getId(), null)));

    return reviews;
  }

  public List<ReviewProfileDTO> convertToDTOs(List<ReviewEntity> reviews) {
    Set<String> animeIds =
        reviews.stream().map(ReviewEntity::getAnimeId).collect(Collectors.toSet());

    Map<String, Anime> animeMap = animeService.findAllByIds(animeIds);

    return reviews.stream()
        .map(
            review -> {
              Anime anime = animeMap.get(review.getAnimeId());
              String animeName =
                  (anime != null && anime.getTitle() != null)
                      ? anime.getTitle().getRU()
                      : "Unknown";

              return ReviewProfileDTO.builder()
                  .id(review.getId())
                  .title(review.getTitle())
                  .text(review.getText())
                  .userId(review.getUserId())
                  .userName(review.getUserName())
                  .animeId(review.getAnimeId())
                  .animeName(animeName)
                  .createdAt(review.getCreatedAt())
                  .score(review.getScore())
                  .likes(review.getLikes())
                  .dislikes(review.getDislikes())
                  .status(review.getStatus())
                  .userVote(review.getUserVote())
                  .build();
            })
        .collect(Collectors.toList());
  }
}
