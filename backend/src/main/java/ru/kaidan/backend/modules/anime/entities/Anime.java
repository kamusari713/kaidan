package ru.kaidan.backend.modules.anime.entities;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;
import ru.kaidan.backend.modules.anime.entities.types.CoverImage;
import ru.kaidan.backend.modules.anime.entities.types.Description;
import ru.kaidan.backend.modules.anime.entities.types.ExternalLink;
import ru.kaidan.backend.modules.anime.entities.types.Genre;
import ru.kaidan.backend.modules.anime.entities.types.Kind;
import ru.kaidan.backend.modules.anime.entities.types.Rating;
import ru.kaidan.backend.modules.anime.entities.types.Status;
import ru.kaidan.backend.modules.anime.entities.types.Tag;
import ru.kaidan.backend.modules.anime.entities.types.Title;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;

@Builder
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
