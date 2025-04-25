package ru.kaidan.backend.modules.review.repositories;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;

public interface ReviewRepository extends MongoRepository<ReviewEntity, String> {

  List<ReviewEntity> findByUserId(String userId);

  List<ReviewEntity> findByAnimeId(String animeId);

  Page<ReviewEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);

  List<ReviewEntity> findAllByOrderByCreatedAtDesc();
}
