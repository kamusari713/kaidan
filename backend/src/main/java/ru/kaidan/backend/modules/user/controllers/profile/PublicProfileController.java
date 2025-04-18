package ru.kaidan.backend.modules.user.controllers.profile;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;
import ru.kaidan.backend.modules.comment.services.CommentService;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.services.ReviewService;
import ru.kaidan.backend.modules.user.DTO.AnimeListResponse;
import ru.kaidan.backend.modules.user.DTO.UserProfileResponse;
import ru.kaidan.backend.modules.user.services.UserAnimeListService;
import ru.kaidan.backend.modules.user.services.UserProfileService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/user/{userId}/profiles")
public class PublicProfileController {
  private final UserProfileService userProfileService;
  private final UserAnimeListService userAnimeListService;
  private final CommentService commentService;
  private final ReviewService reviewService;

  @GetMapping
  public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable String userId) {
    return ResponseEntity.ok().body(userProfileService.findUserProfile(userId));
  }

  @GetMapping("/anime-lists")
  public ResponseEntity<List<AnimeListResponse>> getUserAnimeLists(@PathVariable String userId) {
    return ResponseEntity.ok().body(userAnimeListService.findProfileUserAnimeList(userId));
  }

  @GetMapping("/comments")
  public ResponseEntity<List<CommentEntity>> getUserComments(@PathVariable String userId) {
    return ResponseEntity.ok().body(commentService.getUserCommentTree(userId));
  }

  @GetMapping("/reviews")
  public ResponseEntity<List<ReviewEntity>> getUserReviews(@PathVariable String userId) {
    return ResponseEntity.ok().body(reviewService.findByUser(userId));
  }
}
