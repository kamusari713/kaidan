package ru.kaidan.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.Entities.Genre;

public interface GenreRepository extends MongoRepository<Genre, String> {
}
