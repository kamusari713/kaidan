package ru.kaidan.backend.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.kaidan.backend.Entities.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {
}
