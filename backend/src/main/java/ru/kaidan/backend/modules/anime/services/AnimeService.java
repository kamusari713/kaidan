package ru.kaidan.backend.modules.anime.services;

import java.util.List;
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

  public Page findPage(int page, int perPage, Sort sort, String search) {
    if (search != null || sort.getDirection() != null || sort.getOrderBy() != null) {
      return animeRepository.findPageWithFilters(page, perPage, sort, search);
    } else {
      throw new IllegalArgumentException("Must provide search string or ids");
    }
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
}
