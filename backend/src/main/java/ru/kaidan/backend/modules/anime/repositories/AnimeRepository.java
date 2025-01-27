package ru.kaidan.backend.modules.anime.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.anime.entities.Anime;

import java.util.Optional;

public interface AnimeRepository extends MongoRepository<Anime, String>, CustomAnimeRepository {
    Optional<Anime> findByShikimoriId(String shikimoriId);
}