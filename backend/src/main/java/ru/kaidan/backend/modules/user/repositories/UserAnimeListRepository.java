package ru.kaidan.backend.modules.user.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.user.entities.UserAnimeListEntity;

public interface UserAnimeListRepository extends MongoRepository<UserAnimeListEntity, String> {

  List<UserAnimeListEntity> findByUserId(String userId);

  Optional<UserAnimeListEntity> findByUserIdAndShikimoriId(String userId, String animeId);
}
