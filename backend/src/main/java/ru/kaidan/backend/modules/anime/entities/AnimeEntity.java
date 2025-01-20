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
    private Title title;
    private List<String> synonyms;
    private Description description;
    private String watchRating;
    private int episodes;
    private int duration;

    private LocalDate startDate;
    private LocalDate endDate;

    private String bannerImage;
    private CoverImage coverImage;

    private List<ExternalLink> externalLinks;
    private double shikimoriScore;
    private String shikimoriUrl;
    private double averageScore;
    private int scoresCount;

    private List<Genre> genres;
    private List<Tag> tags;
    private List<String> studios;
}