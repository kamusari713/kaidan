package ru.kaidan.backend.modules.auth.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.auth.entities.TokenEntity;
import ru.kaidan.backend.modules.auth.entities.TokenType;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends MongoRepository<TokenEntity, String> {
    List<TokenEntity> findByUserIdAndRevokedFalse(String id);

    List<TokenEntity> findByUserIdAndRevokedFalseAndType(String id, TokenType type);

    Optional<TokenEntity> findByToken(String token);
}
