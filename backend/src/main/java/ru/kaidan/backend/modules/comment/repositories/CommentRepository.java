package ru.kaidan.backend.modules.comment.repositories;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;

public interface CommentRepository extends MongoRepository<CommentEntity, String> {

  List<CommentEntity> findByUserId(String userId);

  List<CommentEntity> findByAnimeId(String animeId);

  List<CommentEntity> findByReviewId(String reviewId);
}
