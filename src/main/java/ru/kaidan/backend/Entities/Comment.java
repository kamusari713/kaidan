package ru.kaidan.backend.Entities;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "comment")
public class Comment {
    @Id
    private String id;
    private String userId;

    @Indexed
    private String animeId;

    @DBRef
    private List<Review> reviews = new ArrayList<>();
    private String content;

    @CreatedDate
    private Date createdAt;
}