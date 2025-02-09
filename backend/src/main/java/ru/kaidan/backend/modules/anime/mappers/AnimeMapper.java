package ru.kaidan.backend.modules.anime.mappers;

import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.AnimeRaw;

public interface AnimeMapper {

    Anime rawToEntity(AnimeRaw rawData);
}
