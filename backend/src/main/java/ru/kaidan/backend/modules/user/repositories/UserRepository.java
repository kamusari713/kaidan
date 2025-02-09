package ru.kaidan.backend.modules.user.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import ru.kaidan.backend.modules.user.entities.UserEntity;

public interface UserRepository extends MongoRepository<UserEntity, String> {

    Optional<UserEntity> findByUsername(String username);
}
