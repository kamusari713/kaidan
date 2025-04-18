package ru.kaidan.backend.modules.anime.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.user.entities.AnimeListStatus;
import ru.kaidan.backend.modules.user.services.UserAnimeListService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/anime")
public class PrivateAnimeController {
  private final UserAnimeListService userAnimeListService;

  @GetMapping("/{animeId}/user/{userId}/statuses")
  public ResponseEntity<AnimeListStatus> getStatus(
      @PathVariable String animeId, @PathVariable String userId) {
    return userAnimeListService
        .findStatus(userId, animeId)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.noContent().build());
  }
}
