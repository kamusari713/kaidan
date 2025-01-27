package ru.kaidan.backend.modules.anime.entities.types;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ru.kaidan.backend.modules.anime.entities.Anime;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class Page {
    private PageInfo pageInfo;
    private List<Anime> media;
}
