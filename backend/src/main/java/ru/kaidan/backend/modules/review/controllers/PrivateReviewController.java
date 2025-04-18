package ru.kaidan.backend.modules.review.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.review.DTO.ReviewRequest;
import ru.kaidan.backend.modules.review.DTO.ReviewVoteRequest;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.services.ReviewService;
import ru.kaidan.backend.modules.review.services.ReviewVoteService;
import ru.kaidan.backend.utils.exceptions.ErrorResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/reviews")
public class PrivateReviewController {
  private final ReviewService reviewService;
  private final ReviewVoteService reviewVoteService;

  @PostMapping
  public ResponseEntity<ReviewEntity> createReview(@RequestBody ReviewRequest reviewRequest) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(reviewService.createReview(reviewRequest));
  }

  @PostMapping("/{reviewId}/vote")
  public ResponseEntity<ReviewEntity> voteForReview(
      @RequestBody ReviewVoteRequest reviewVoteRequest) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(reviewVoteService.voteForReview(reviewVoteRequest));
  }
}
