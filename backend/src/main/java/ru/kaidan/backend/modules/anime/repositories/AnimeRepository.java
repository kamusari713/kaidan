package ru.kaidan.backend.modules.anime.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import ru.kaidan.backend.modules.anime.entities.Anime;

public interface AnimeRepository extends MongoRepository<Anime, String>, CustomAnimeRepository {

    Optional<Anime> findByShikimoriId(String shikimoriId);
}
