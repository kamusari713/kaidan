package ru.kaidan.backend.modules.auth.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.auth.entities.TokenEntity;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends MongoRepository<TokenEntity, String> {
    List<TokenEntity> findByUserIdAndRevokedFalse(String id);

    Optional<TokenEntity> findByToken(String token);
}
