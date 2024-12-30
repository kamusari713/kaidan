package ru.kaidan.backend.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "anime")
public class Anime {
    @Id
    private String id;

    @Indexed(unique = true)
    private String title;

    private String description;
    private String cover;
    private String animeType;
    private LocalDate releaseDate;
    private int episodeAmount;

    @Indexed
    private String status;

    @DBRef(lazy = true)
    private List<Genre> genres = new ArrayList<>();

    private List<String> commentsId = new ArrayList<>();
    private List<String> ratingsId = new ArrayList<>();
}
