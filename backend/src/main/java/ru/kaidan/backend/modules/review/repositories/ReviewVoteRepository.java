package ru.kaidan.backend.modules.review.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.review.entities.ReviewVoteEntity;
import ru.kaidan.backend.modules.review.entities.ReviewVoteType;

public interface ReviewVoteRepository extends MongoRepository<ReviewVoteEntity, String> {
  Optional<ReviewVoteEntity> findByUserIdAndReviewId(String userId, String reviewId);

  long countByReviewIdAndVote(String reviewId, ReviewVoteType reviewVoteType);

  List<ReviewVoteEntity> findByUserIdAndReviewIdIn(String userId, List<String> list);
}
