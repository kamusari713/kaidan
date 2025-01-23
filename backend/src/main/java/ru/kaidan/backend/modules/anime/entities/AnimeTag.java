package ru.kaidan.backend.modules.anime.entities;

import lombok.Data;

@Data
public class AnimeTag {
    private String name_EN;
    private String name_RU;
    private String description_EN;
    private String description_RU;
    private Integer rank;
    private Boolean isSpoiler;
}
