package ru.kaidan.backend.modules.user.controllers;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.auth.DTO.UserCredentials;
import ru.kaidan.backend.modules.auth.services.AuthService;
import ru.kaidan.backend.modules.user.DTO.UserAnimeListRequest;
import ru.kaidan.backend.modules.user.entities.AnimeListStatus;
import ru.kaidan.backend.modules.user.entities.UserAnimeListEntity;
import ru.kaidan.backend.modules.user.services.UserAnimeListService;
import ru.kaidan.backend.utils.exceptions.custom.ExpiredTokenException;
import ru.kaidan.backend.utils.exceptions.custom.MissingTokenException;

@RestController
@RequestMapping("/api/public/user/anime-list")
@RequiredArgsConstructor
public class UserAnimeListController {
  private final AuthService authService;
  private final UserAnimeListService userAnimeListService;

  @GetMapping("/status")
  public ResponseEntity<AnimeListStatus> getStatus(
      HttpServletRequest request, @RequestParam String animeId) {
    try {
      UserCredentials credentials = authService.findCredentials(request);
      return userAnimeListService
          .findStatus(credentials.getId(), animeId)
          .map(ResponseEntity::ok)
          .orElse(ResponseEntity.noContent().build());
    } catch (MissingTokenException | ExpiredTokenException | ExpiredJwtException e) {
      return null;
    }
  }

  @PostMapping
  public ResponseEntity<UserAnimeListEntity> addToList(
      HttpServletRequest request, @RequestBody UserAnimeListRequest userAnimeListRequest) {
    try {
      UserCredentials credentials = authService.findCredentials(request);
      return ResponseEntity.ok()
          .body(
              userAnimeListService.addOrUpdate(
                  credentials.getId(),
                  userAnimeListRequest.getAnimeId(),
                  userAnimeListRequest.getStatus()));
    } catch (MissingTokenException | ExpiredTokenException | ExpiredJwtException e) {
      return null;
    }
  }

  @DeleteMapping
  public ResponseEntity<UserAnimeListEntity> removeFromList(
      HttpServletRequest request, @RequestParam String animeId) {
    try {
      UserCredentials credentials = authService.findCredentials(request);
      return ResponseEntity.ok().body(userAnimeListService.remove(credentials.getId(), animeId));
    } catch (MissingTokenException | ExpiredTokenException | ExpiredJwtException e) {
      return null;
    }
  }
}
