package ru.kaidan.backend.modules.anime.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.anime.entities.Tag;

public interface TagRepository extends MongoRepository<Tag, String> {}
