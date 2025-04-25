package ru.kaidan.backend.modules.anime.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.modules.anime.entities.Genre;

public interface GenreRepository extends MongoRepository<Genre, String> {}
