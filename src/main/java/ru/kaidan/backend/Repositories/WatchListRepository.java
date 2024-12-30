package ru.kaidan.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.Entities.WatchList;

public interface WatchListRepository extends MongoRepository<WatchList, String> {
}
