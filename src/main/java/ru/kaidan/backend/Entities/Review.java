package ru.kaidan.backend.Entities;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "review")
public class Review {
    @Id
    private String id;
    private String userId;

    @Indexed
    private String animeId;
    private String commentId;
    private String content;

    @CreatedDate
    private Date createdAt;
}
