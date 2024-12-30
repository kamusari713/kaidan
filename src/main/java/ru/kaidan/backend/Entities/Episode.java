package ru.kaidan.backend.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "episode")
public class Episode {
    @Id
    private String id;
    @Indexed
    private String animeId;
    private int number;
    private String streamingUrl;
}