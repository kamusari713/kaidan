package ru.kaidan.backend.modules.review.controllers;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.auth.DTO.UserCredentials;
import ru.kaidan.backend.modules.auth.services.AuthService;
import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.DTO.ReviewVoteRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.services.ReviewService;
import ru.kaidan.backend.modules.review.services.ReviewVoteService;
import ru.kaidan.backend.utils.exceptions.custom.ExpiredTokenException;
import ru.kaidan.backend.utils.exceptions.custom.MissingTokenException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/review")
public class ReviewController {
  private final AuthService authService;
  private final ReviewService reviewService;
  private final ReviewVoteService reviewVoteService;

  @GetMapping("/anime/{animeId}")
  public List<ReviewEntity> getReviewsByAnime(
      @PathVariable String animeId, HttpServletRequest request) {
    try {
      UserCredentials credentials = authService.findCredentials(request);
      return reviewService.findByAnime(animeId, credentials.getId());
    } catch (MissingTokenException | ExpiredTokenException | ExpiredJwtException e) {
      return reviewService.findByAnime(animeId);
    }
  }

  @PostMapping("/new")
  public ResponseEntity<ReviewEntity> addReview(@RequestBody ReviewRequest reviewRequest) {
    return ResponseEntity.ok(reviewService.createReview(reviewRequest));
  }

  @PostMapping("/vote")
  public ResponseEntity<ReviewEntity> vote(@RequestBody ReviewVoteRequest reviewVoteRequest) {
    return ResponseEntity.ok(reviewVoteService.voteForReview(reviewVoteRequest));
  }
}
