package ru.kaidan.backend.modules.review.services;

import java.time.Instant;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.review.DTO.ReviewVoteRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.entities.ReviewVoteEntity;
import ru.kaidan.backend.modules.review.entities.ReviewVoteType;
import ru.kaidan.backend.modules.review.repositories.ReviewRepository;
import ru.kaidan.backend.modules.review.repositories.ReviewVoteRepository;

@Service
@RequiredArgsConstructor
public class ReviewVoteService {
  private final ReviewVoteRepository reviewVoteRepository;
  private final ReviewRepository reviewRepository;

  public ReviewEntity voteForReview(ReviewVoteRequest reviewVoteRequest) {
    String userId = reviewVoteRequest.getUserId();
    String reviewId = reviewVoteRequest.getReviewId();
    ReviewVoteType newVote = reviewVoteRequest.getVote();

    Optional<ReviewVoteEntity> existingVoteOpt =
        reviewVoteRepository.findByUserIdAndReviewId(userId, reviewId);

    if (existingVoteOpt.isPresent()) {
      ReviewVoteEntity existing = existingVoteOpt.get();

      if (existing.getVote() == newVote) {
        reviewVoteRepository.delete(existing);
      } else {
        existing.setVote(newVote);
        existing.setCreatedAt(Instant.now());
        reviewVoteRepository.save(existing);
      }

    } else {
      ReviewVoteEntity vote =
          ReviewVoteEntity.builder()
              .userId(userId)
              .reviewId(reviewId)
              .vote(newVote)
              .createdAt(Instant.now())
              .build();

      reviewVoteRepository.save(vote);
    }

    long likes = reviewVoteRepository.countByReviewIdAndVote(reviewId, ReviewVoteType.LIKE);
    long dislikes = reviewVoteRepository.countByReviewIdAndVote(reviewId, ReviewVoteType.DISLIKE);

    ReviewEntity review =
        reviewRepository
            .findById(reviewId)
            .orElseThrow(() -> new RuntimeException("Review not found"));

    Optional<ReviewVoteEntity> voteOpt =
        reviewVoteRepository.findByUserIdAndReviewId(userId, reviewId);
    review.setUserVote(voteOpt.map(ReviewVoteEntity::getVote).orElse(null));

    review.setLikes(likes);
    review.setDislikes(dislikes);

    return reviewRepository.save(review);
  }
}
