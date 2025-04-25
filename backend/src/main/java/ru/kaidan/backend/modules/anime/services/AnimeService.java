package ru.kaidan.backend.modules.anime.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.entities.types.*;
import ru.kaidan.backend.modules.anime.mappers.AnimeMapper;
import ru.kaidan.backend.modules.anime.repositories.AnimeRepository;

@Service
@RequiredArgsConstructor
public class AnimeService {

  private final AnimeRepository animeRepository;
  private final AnimeMapper animeMapper;

  public Anime findByShikimoriId(String shikimoriId) {
    if (shikimoriId != null) {
      return animeRepository.findByShikimoriId(shikimoriId).orElse(null);
    } else {
      throw new IllegalArgumentException("Must provide id");
    }
  }

  public Page findPage(int page, int perPage, Sort sort, String search, AnimeFilter filter) {
    if (search != null || sort.getOrderBy() != null || filter != null) {
      return animeRepository.findPageWithFilters(page, perPage, sort, search, filter);
    } else {
      throw new IllegalArgumentException("Must provide search string, sort, or filter");
    }
  }

  public List<String> findAllStudios() {
    return animeRepository.findUniqueStudios();
  }

  @Transactional
  public ResultMessage addRawAnimeList(List<AnimeRaw> dataSet) {
    List<Anime> mappedAnime = dataSet.stream().map(animeMapper::rawToEntity).toList();
    animeRepository.saveAll(mappedAnime);
    return ResultMessage.builder()
        .message("Anime added successfully")
        .total(mappedAnime.size())
        .build();
  }

  public Map<String, Anime> findAllByIds(Set<String> ids) {
    return animeRepository.findByShikimoriIdIn(ids).stream()
        .collect(Collectors.toMap(Anime::getShikimoriId, Function.identity()));
  }

  public Anime createAnime(AnimeRaw input) {
    if (animeRepository.existsByShikimoriId(input.getShikimoriId())) {
      throw new IllegalArgumentException(
          "Anime with shikimoriId " + input.getShikimoriId() + " already exists");
    }

    Anime anime = animeMapper.rawToEntity(input);
    return animeRepository.save(anime);
  }

  public Anime updateAnime(String shikimoriId, AnimeRaw input) {
    Optional<Anime> existingAnime = animeRepository.findByShikimoriId(shikimoriId);
    if (existingAnime.isEmpty()) {
      throw new IllegalArgumentException("Anime with shikimoriId " + shikimoriId + " not found");
    }

    Anime anime = existingAnime.get();
    updateAnimeFromInput(anime, input);
    return animeRepository.save(anime);
  }

  private void updateAnimeFromInput(Anime anime, AnimeRaw input) {
    anime.setTitle(input.getTitle() != null ? input.getTitle() : anime.getTitle());
    anime.setSynonyms(input.getSynonyms() != null ? input.getSynonyms() : anime.getSynonyms());
    anime.setDescription(
        input.getDescription() != null ? input.getDescription() : anime.getDescription());
    anime.setShikimoriScore(
        input.getShikimoriScore() != null ? input.getShikimoriScore() : anime.getShikimoriScore());
    anime.setShikimoriUrl(
        input.getShikimoriUrl() != null ? input.getShikimoriUrl() : anime.getShikimoriUrl());
    anime.setRating(input.getRating() != null ? input.getRating() : anime.getRating());
    anime.setEpisodes(input.getEpisodes() != null ? input.getEpisodes() : anime.getEpisodes());
    anime.setDuration(input.getDuration() != null ? input.getDuration() : anime.getDuration());
    anime.setExternalLinks(
        input.getExternalLinks() != null ? input.getExternalLinks() : anime.getExternalLinks());
    anime.setKind(input.getKind() != null ? input.getKind() : anime.getKind());
    anime.setRating(input.getRating() != null ? input.getRating() : anime.getRating());
    anime.setStatus(input.getStatus() != null ? input.getStatus() : anime.getStatus());
    anime.setStartDate(input.getStartDate() != null ? input.getStartDate() : anime.getStartDate());
    anime.setEndDate(input.getEndDate() != null ? input.getEndDate() : anime.getEndDate());
    anime.setCoverImage(
        input.getCoverImage() != null ? input.getCoverImage() : anime.getCoverImage());
    anime.setGenres(input.getGenres() != null ? input.getGenres() : anime.getGenres());
    anime.setStudios(input.getStudios() != null ? input.getStudios() : anime.getStudios());
    anime.setTags(input.getTags() != null ? input.getTags() : anime.getTags());
  }
}
