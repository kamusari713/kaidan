package ru.kaidan.backend.modules.review.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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

  public List<ReviewEntity> findByAnime(String animeId) {
    return reviewRepository.findByAnimeId(animeId);
  }

  public List<ReviewEntity> findByAnime(String animeId, String userId) {
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
    return reviewMapper.dtoToEntity(reviewRequest);
  }
}
