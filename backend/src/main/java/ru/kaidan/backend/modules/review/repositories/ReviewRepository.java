package ru.kaidan.backend.modules.review.repositories;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;

public interface ReviewRepository extends MongoRepository<ReviewEntity, String> {

  List<ReviewEntity> findByUserId(String userId);

  List<ReviewEntity> findByAnimeId(String animeId);
}
