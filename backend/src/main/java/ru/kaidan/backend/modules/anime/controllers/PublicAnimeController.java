package ru.kaidan.backend.modules.anime.controllers;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.auth.DTO.UserCredentials;
import ru.kaidan.backend.modules.auth.services.AuthService;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;
import ru.kaidan.backend.modules.comment.services.CommentService;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.services.ReviewService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/anime")
public class PublicAnimeController {
  private final AuthService authService;
  private final CommentService commentService;
  private final ReviewService reviewService;

  @GetMapping("/{animeId}/comments")
  public ResponseEntity<List<CommentEntity>> getAnimeComments(@PathVariable String animeId) {
    return ResponseEntity.ok().body(commentService.getAnimeCommentTree(animeId));
  }

  @GetMapping("/{animeId}/reviews")
  public ResponseEntity<List<ReviewEntity>> getReviewsByAnime(
      @PathVariable String animeId, HttpServletRequest request) {
    try {
      UserCredentials credentials = authService.findCredentials(request);
      return ResponseEntity.ok()
          .body(reviewService.findByUserIdAndAnimeId(credentials.getId(), animeId));
    } catch (ExpiredJwtException e) {
      return ResponseEntity.ok().body(reviewService.findByAnime(animeId));
    }
  }
}
