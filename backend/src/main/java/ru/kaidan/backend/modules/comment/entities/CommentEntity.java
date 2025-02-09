package ru.kaidan.backend.modules.comment.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("comments")
public class CommentEntity {

    @Id
    private String id;
    private String authorId;
    private String parentId;
    private String text;
    private String createdAt;
}
