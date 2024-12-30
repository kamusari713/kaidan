package ru.kaidan.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.Entities.Review;

public interface ReviewRepository extends MongoRepository<Review, String> {
}
