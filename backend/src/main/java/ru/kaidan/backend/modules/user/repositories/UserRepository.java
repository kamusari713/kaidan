package ru.kaidan.backend.modules.user.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.user.entities.UserEntity;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    Optional<UserEntity> findByUsername(String username);
}
