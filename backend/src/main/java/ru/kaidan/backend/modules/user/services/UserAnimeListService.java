package ru.kaidan.backend.modules.user.services;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.repositories.AnimeRepository;
import ru.kaidan.backend.modules.user.DTO.AnimeListAddRequest;
import ru.kaidan.backend.modules.user.DTO.AnimeListResponse;
import ru.kaidan.backend.modules.user.entities.AnimeListStatus;
import ru.kaidan.backend.modules.user.entities.UserAnimeListEntity;
import ru.kaidan.backend.modules.user.repositories.UserAnimeListRepository;

@Service
@RequiredArgsConstructor
public class UserAnimeListService {
  private final UserAnimeListRepository userAnimeListRepository;
  private final AnimeRepository animeRepository;

  public List<UserAnimeListEntity> findUserAnimeLists(String userId) {
    return userAnimeListRepository.findByUserId(userId);
  }

  public UserAnimeListEntity addOrUpdate(
      String userId, String animeId, AnimeListAddRequest requestBody) {
    UserAnimeListEntity animeListEntity =
        userAnimeListRepository
            .findByUserIdAndAnimeId(userId, animeId)
            .orElseGet(
                () -> {
                  UserAnimeListEntity newAnimeListEntity = new UserAnimeListEntity();
                  newAnimeListEntity.setUserId(userId);
                  newAnimeListEntity.setAnimeId(animeId);
                  newAnimeListEntity.setCreatedAt(Instant.now());
                  return newAnimeListEntity;
                });

    animeListEntity.setStatus(requestBody.getStatus());
    animeListEntity.setUpdatedAt(Instant.now());
    return userAnimeListRepository.save(animeListEntity);
  }

  public Optional<AnimeListStatus> findStatus(String userId, String animeId) {
    return userAnimeListRepository
        .findByUserIdAndAnimeId(userId, animeId)
        .map(UserAnimeListEntity::getStatus);
  }

  public void removeAnimeFromList(String userId, String animeId) {
    UserAnimeListEntity animeListEntity =
        userAnimeListRepository
            .findByUserIdAndAnimeId(userId, animeId)
            .orElseThrow(() -> new RuntimeException("Entry not found"));

    userAnimeListRepository.delete(animeListEntity);
  }

  public List<AnimeListResponse> findProfileUserAnimeList(String userId) {
    List<UserAnimeListEntity> entries = userAnimeListRepository.findByUserId(userId);

    List<String> animeIds =
        entries.stream().map(UserAnimeListEntity::getAnimeId).distinct().toList();

    List<Anime> animeList = animeRepository.findAllById(animeIds);

    Map<String, Anime> animeMap =
        animeList.stream().collect(Collectors.toMap(Anime::getId, Function.identity()));

    return entries.stream()
        .map(
            animeListEntity -> {
              Anime anime = animeMap.get(animeListEntity.getAnimeId());
              if (anime == null) {
                throw new RuntimeException("Аниме не найдено: " + animeListEntity.getAnimeId());
              }
              return AnimeListResponse.builder()
                  .animeId(anime.getShikimoriId())
                  .image(anime.getCoverImage().getExtraLarge())
                  .title(anime.getTitle().getRU())
                  .addedAt(LocalDate.from(animeListEntity.getCreatedAt()))
                  .build();
            })
        .toList();
  }
}
