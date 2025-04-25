package ru.kaidan.backend.modules.anime.repositories;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.anime.entities.Anime;

public interface AnimeRepository extends MongoRepository<Anime, String>, CustomAnimeRepository {

  Optional<Anime> findByShikimoriId(String shikimoriId);

  List<Anime> findByShikimoriIdIn(Set<String> shikimoriIds);

  Page<Anime> findByShikimoriIdIn(Pageable pageable, Set<String> shikimoriIds);

  List<Anime> findAllByShikimoriIdIn(List<String> animeIds);

  @Aggregation(
      pipeline = {
        "{ '$unwind': '$studios' }",
        "{ '$group': { '_id': '$studios' } }",
        "{ '$project': { '_id': 0, 'studio': '$_id' } }"
      })
  List<String> findUniqueStudios();

  boolean existsByShikimoriId(String shikimoriId);
}
