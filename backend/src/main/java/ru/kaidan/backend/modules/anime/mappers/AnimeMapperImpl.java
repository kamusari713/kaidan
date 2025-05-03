package ru.kaidan.backend.modules.anime.mappers;

import java.time.LocalDate;
import java.util.Collections;

import org.springframework.stereotype.Component;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.*;

@Component
public class AnimeMapperImpl implements AnimeMapper {

    @Override
    public Anime rawToEntity(AnimeRaw rawData) {
        return Anime.builder()
                .title(rawData.getTitle() != null ? rawData.getTitle() : new Title())
                .synonyms(rawData.getSynonyms() != null ? rawData.getSynonyms() : Collections.emptyList())
                .description(
                        rawData.getDescription() != null ? rawData.getDescription() : new Description())
                .shikimoriScore(rawData.getShikimoriScore() != null ? rawData.getShikimoriScore() : 0.0)
                .shikimoriId(rawData.getShikimoriId())
                .shikimoriUrl(rawData.getShikimoriUrl() != null ? rawData.getShikimoriUrl() : "")
                .externalLinks(
                        rawData.getExternalLinks() != null
                                ? rawData.getExternalLinks()
                                : Collections.emptyList())
                .genres(rawData.getGenres() != null ? rawData.getGenres() : Collections.emptyList())
                .studios(rawData.getStudios() != null ? rawData.getStudios() : Collections.emptyList())
                .tags(rawData.getTags() != null ? rawData.getTags() : Collections.emptyList())
                .kind(rawData.getKind() != null ? rawData.getKind() : Kind.tv)
                .rating(rawData.getRating() != null ? rawData.getRating() : Rating.g)
                .status(rawData.getStatus() != null ? rawData.getStatus() : Status.builder().RU("").EN("").build())
                .startDate(rawData.getStartDate() != null ? rawData.getStartDate() : LocalDate.MIN)
                .endDate(rawData.getEndDate() != null ? rawData.getEndDate() : LocalDate.MAX)
                .episodes(rawData.getEpisodes() != null ? rawData.getEpisodes() : 0)
                .duration(rawData.getDuration() != null ? rawData.getDuration() : 0)
                .coverImage(rawData.getCoverImage() != null ? rawData.getCoverImage() : new CoverImage())
                .averageScore(0.0)
                .scoreCount(0)
                .build();
    }
}
