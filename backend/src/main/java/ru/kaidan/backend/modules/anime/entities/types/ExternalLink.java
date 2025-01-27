package ru.kaidan.backend.modules.anime.entities.types;

import lombok.Data;

@Data
public class ExternalLink {
    private String source;
    private String url;
}
