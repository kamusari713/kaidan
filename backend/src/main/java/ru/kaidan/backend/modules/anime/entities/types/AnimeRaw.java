package ru.kaidan.backend.modules.anime.entities.types;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class AnimeRaw {

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
}
