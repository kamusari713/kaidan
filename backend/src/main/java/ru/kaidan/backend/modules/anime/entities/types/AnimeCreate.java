package ru.kaidan.backend.modules.anime.entities.types;

import lombok.Data;
import ru.kaidan.backend.modules.anime.entities.Genre;
import ru.kaidan.backend.modules.anime.entities.Tag;

import java.util.List;

@Data
public class AnimeCreate {

    private Title title;
    private Description description;
    private String shikimoriId;
    private Kind kind;
    private Rating rating;
    private Status status;
    private Integer episodes;
    private CoverImage coverImage;
    private List<Genre> genres;
    private List<String> studios;
    private List<Tag> tags;
}
