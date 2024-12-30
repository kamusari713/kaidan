package ru.kaidan.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.Entities.Episode;

import java.util.List;

public interface EpisodeRepository extends MongoRepository<Episode, String> {
    List<Episode> findByAnimeId(String id);
}
