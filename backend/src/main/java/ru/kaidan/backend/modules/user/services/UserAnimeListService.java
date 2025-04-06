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
    return userAnimeListRepository.findAllByUserId(userId);
  }

  public UserAnimeListEntity addOrUpdate(String userId, String animeId, AnimeListStatus status) {
    UserAnimeListEntity entry =
        userAnimeListRepository
            .findByUserIdAndAnimeId(userId, animeId)
            .orElseGet(
                () -> {
                  UserAnimeListEntity newEntry = new UserAnimeListEntity();
                  newEntry.setUserId(userId);
                  newEntry.setAnimeId(animeId);
                  newEntry.setCreatedAt(Instant.now());
                  return newEntry;
                });

    entry.setStatus(status);
    entry.setUpdatedAt(Instant.now());

    return userAnimeListRepository.save(entry);
  }

  public Optional<AnimeListStatus> findStatus(String userId, String animeId) {
    return userAnimeListRepository
        .findByUserIdAndAnimeId(userId, animeId)
        .map(UserAnimeListEntity::getStatus);
  }

  public UserAnimeListEntity remove(String userId, String animeId) {
    UserAnimeListEntity entry =
        userAnimeListRepository
            .findByUserIdAndAnimeId(userId, animeId)
            .orElseThrow(() -> new RuntimeException("Entry not found"));

    userAnimeListRepository.delete(entry);
    return entry;
  }

  public List<UserAnimeListEntity> findUserAnimeList(String userId) {
    return userAnimeListRepository.findAllByUserId(userId);
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
            entry -> {
              Anime anime = animeMap.get(entry.getAnimeId());
              if (anime == null) {
                throw new RuntimeException("Аниме не найдено: " + entry.getAnimeId());
              }
              return AnimeListResponse.builder()
                  .animeId(anime.getShikimoriId())
                  .image(anime.getCoverImage().getExtraLarge())
                  .title(anime.getTitle().getRU())
                  .addedAt(LocalDate.from(entry.getCreatedAt()))
                  .build();
            })
        .toList();
  }
}
