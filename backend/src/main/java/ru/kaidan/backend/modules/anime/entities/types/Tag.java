package ru.kaidan.backend.modules.anime.entities.types;

import lombok.Data;

@Data
public class Tag {

    private TagTranslation EN;
    private TagTranslation RU;
    private Integer rank;
    private Boolean isSpoiler;
}
