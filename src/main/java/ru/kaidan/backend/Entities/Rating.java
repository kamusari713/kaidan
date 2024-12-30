package ru.kaidan.backend.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "rating")
@CompoundIndex(def = "{'userId': 1, 'animeId': 1}", unique = true)
public class Rating {
    @Id
    private String id;
    private String userId;
    @Indexed
    private String animeId;
    private int score;
}