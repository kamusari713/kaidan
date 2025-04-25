package ru.kaidan.backend.modules.review.controllers;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;
import ru.kaidan.backend.modules.comment.services.CommentService;
import ru.kaidan.backend.modules.review.DTO.ReviewCardDTO;
import ru.kaidan.backend.modules.review.services.ReviewService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/reviews")
public class PublicReviewController {
  private final ReviewService reviewService;
  private final CommentService commentService;

  @GetMapping("/{reviewId}/comments")
  public ResponseEntity<List<CommentEntity>> getReviewComments(@PathVariable String reviewId) {
    return ResponseEntity.ok().body(commentService.getReviewCommentTree(reviewId));
  }

  @GetMapping("/recent")
  public ResponseEntity<List<ReviewCardDTO>> getReviews() {
    return ResponseEntity.ok(reviewService.getRecentReviews());
  }
}
