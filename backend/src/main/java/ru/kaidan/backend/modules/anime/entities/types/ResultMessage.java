package ru.kaidan.backend.modules.anime.entities.types;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ResultMessage {

    private String message;
    private Integer total;
}
