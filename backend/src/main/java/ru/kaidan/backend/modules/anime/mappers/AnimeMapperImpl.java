package ru.kaidan.backend.modules.anime.mappers;

import java.util.List;

import org.springframework.stereotype.Component;

import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.AnimeRaw;

@Component
public class AnimeMapperImpl implements AnimeMapper {

  @Override
  public Anime rawToEntity(AnimeRaw rawData) {
    return Anime.builder()
        .title(rawData.getTitle())
        .synonyms(rawData.getSynonyms())
        .description(rawData.getDescription())
        .shikimoriScore(rawData.getShikimoriScore())
        .shikimoriUrl(rawData.getShikimoriUrl())
        .shikimoriId(rawData.getShikimoriId())
        .externalLinks(rawData.getExternalLinks())
        .kind(rawData.getKind())
        .rating(rawData.getRating())
        .status(rawData.getStatus())
        .startDate(rawData.getStartDate())
        .endDate(rawData.getEndDate())
        .episodes(rawData.getEpisodes())
        .duration(rawData.getDuration())
        .coverImage(rawData.getCoverImage())
        .genres(rawData.getGenres())
        .studios(rawData.getStudios())
        .tags(rawData.getTags())
        .averageScore(0.0)
        .scoreCount(0)
        .build();
  }
}
