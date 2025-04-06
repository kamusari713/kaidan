package ru.kaidan.backend.modules.user.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.user.entities.UserAnimeListEntity;

public interface UserAnimeListRepository extends MongoRepository<UserAnimeListEntity, String> {

  Optional<UserAnimeListEntity> findByUserIdAndAnimeId(String userId, String animeId);

  List<UserAnimeListEntity> findAllByUserId(String userId);

  List<UserAnimeListEntity> findByUserId(String userId);
}
