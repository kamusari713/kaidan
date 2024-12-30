package ru.kaidan.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.Entities.Anime;

import java.util.Optional;

public interface    AnimeRepository extends MongoRepository<Anime, String> {
    Optional<Anime> findByTitle(String title);
}