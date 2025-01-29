package ru.kaidan.backend.modules.anime.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import ru.kaidan.backend.modules.anime.entities.types.*;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "anime")
public class Anime {
    @Id
    private String id;
    private Title title;
    private List<String> synonyms;
    private Description description;
    private Double shikimoriScore;
    private String shikimoriUrl;
    private String shikimoriId;
    private List<ExternalLink> externalLinks;
    private Kind kind;
    private Rating rating;
    private Status status;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer episodes;
    private Integer duration;
    private CoverImage coverImage;
    private List<Genre> genres;
    private List<String> studios;
    private List<Tag> tags;

    private Double averageScore;
    private Integer scoreCount;
    private List<CommentEntity> comments;
}