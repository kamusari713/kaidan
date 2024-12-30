package ru.kaidan.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.Entities.Rating;

import java.util.List;

public interface RatingRepository extends MongoRepository<Rating, String> {
    List<Rating> findByAnimeId(String animeId);
}
