package ru.kaidan.backend.modules.user.repositories;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.user.entities.UserEntity;

public interface UserRepository extends MongoRepository<UserEntity, String> {

  Optional<UserEntity> findByUsername(String username);

  Page<UserEntity> findAll(Pageable pageable);
}
