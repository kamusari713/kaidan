package ru.kaidan.backend.modules.user.controllers.animelist;

import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.user.DTO.AnimeListAddRequest;
import ru.kaidan.backend.modules.user.entities.UserAnimeListEntity;
import ru.kaidan.backend.modules.user.services.UserAnimeListService;

@RestController
@RequestMapping("/api/private/user/{userId}/anime-lists")
@RequiredArgsConstructor
public class PrivateUserAnimeListController {
  private final UserAnimeListService userAnimeListService;

  @PostMapping("/{animeId}")
  public ResponseEntity<UserAnimeListEntity> addToAnimeList(
      @PathVariable String userId,
      @PathVariable String animeId,
      @RequestBody AnimeListAddRequest requestBody) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(userAnimeListService.addOrUpdate(userId, animeId, requestBody));
  }

  @DeleteMapping("/{animeId}")
  public ResponseEntity<Null> removeFromList(
      @PathVariable String userId, @PathVariable String animeId) {
    userAnimeListService.removeAnimeFromList(userId, animeId);
    return ResponseEntity.noContent().build();
  }
}
