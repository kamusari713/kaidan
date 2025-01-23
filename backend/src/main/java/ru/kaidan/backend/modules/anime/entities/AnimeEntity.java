package ru.kaidan.backend.modules.anime.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "anime")
public class AnimeEntity {
    @Id
    private String id;
    private AnimeTitle title;
    private List<String> synonyms;
    private AnimeDescription description;
    private String watchRating;
    private Integer episodes;
    private Integer duration;
    private AnimeType type;

    private LocalDate startDate;
    private LocalDate endDate;

    private String bannerImage;
    private AnimeCoverImage coverImage;

    private List<AnimeExternalLink> externalLinks;
    private Double shikimoriScore;
    private String shikimoriUrl;
    private String shikimoriId;
    private Double averageScore;
    private Integer scoresCount;

    private List<CommentEntity> comments;

    private List<AnimeGenre> genres;
    private List<AnimeTag> tags;
    private List<String> studios;
}