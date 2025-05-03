package ru.kaidan.backend.modules.anime.entities.types;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Status {

    private String EN;
    private String RU;
}
