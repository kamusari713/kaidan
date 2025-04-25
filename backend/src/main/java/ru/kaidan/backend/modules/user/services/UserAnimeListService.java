package ru.kaidan.backend.modules.user.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

  public UserAnimeListEntity addOrUpdate(
      String userId, String animeId, AnimeListAddRequest requestBody) {
    UserAnimeListEntity animeListEntity =
        userAnimeListRepository
            .findByUserIdAndShikimoriId(userId, animeId)
            .orElseGet(
                () ->
                    UserAnimeListEntity.builder()
                        .userId(userId)
                        .shikimoriId(animeId)
                        .createdAt(LocalDate.now())
                        .build());

    animeListEntity.setStatus(requestBody.getStatus());
    animeListEntity.setUpdatedAt(LocalDate.now());
    return userAnimeListRepository.save(animeListEntity);
  }

  public Optional<AnimeListStatus> findStatus(String userId, String animeId) {
    return userAnimeListRepository
        .findByUserIdAndShikimoriId(userId, animeId)
        .map(UserAnimeListEntity::getStatus);
  }

  public void removeAnimeFromList(String userId, String animeId) {
    UserAnimeListEntity animeListEntity =
        userAnimeListRepository
            .findByUserIdAndShikimoriId(userId, animeId)
            .orElseThrow(() -> new RuntimeException("Entry not found"));

    userAnimeListRepository.delete(animeListEntity);
  }

  public List<AnimeListResponse> findProfileUserAnimeList(String userId) {
    List<UserAnimeListEntity> userAnimeList = userAnimeListRepository.findByUserId(userId);

    List<String> animeIds =
        userAnimeList.stream().map(UserAnimeListEntity::getShikimoriId).distinct().toList();

    List<Anime> animeList = animeRepository.findAllByShikimoriIdIn(animeIds);

    Map<String, Anime> animeMap =
        animeList.stream().collect(Collectors.toMap(Anime::getShikimoriId, Function.identity()));

    return userAnimeList.stream()
        .map(
            animeListEntity -> {
              Anime anime = animeMap.get(animeListEntity.getShikimoriId());
              if (anime == null) {
                return null;
              }
              return AnimeListResponse.builder()
                  .userId(animeListEntity.getUserId())
                  .animeId(anime.getShikimoriId())
                  .image(anime.getCoverImage().getExtraLarge())
                  .title(anime.getTitle().getRU())
                  .updatedAt(animeListEntity.getUpdatedAt())
                  .createdAt(animeListEntity.getCreatedAt())
                  .status(animeListEntity.getStatus())
                  .build();
            })
        .toList();
  }

  public Page<Anime> findUserAnimeUpdates(String userId, Integer page, Integer size) {
    Pageable pageable = PageRequest.of(page, size);

    List<UserAnimeListEntity> animeUserListEntities = userAnimeListRepository.findByUserId(userId);

    Set<String> animeIds =
        animeUserListEntities.stream()
            .map(UserAnimeListEntity::getShikimoriId)
            .collect(Collectors.toSet());

    return animeRepository.findByShikimoriIdIn(pageable, animeIds);
  }
}
