package ru.kaidan.backend.modules.user.controllers.profile;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.auth.DTO.UserCredentials;
import ru.kaidan.backend.modules.auth.services.AuthService;
import ru.kaidan.backend.modules.comment.DTO.CommentCardDTO;
import ru.kaidan.backend.modules.comment.services.CommentService;
import ru.kaidan.backend.modules.review.DTO.ReviewProfileDTO;
import ru.kaidan.backend.modules.review.services.ReviewService;
import ru.kaidan.backend.modules.user.DTO.AnimeListResponse;
import ru.kaidan.backend.modules.user.DTO.UserProfileResponse;
import ru.kaidan.backend.modules.user.services.UserAnimeListService;
import ru.kaidan.backend.modules.user.services.UserProfileService;
import ru.kaidan.backend.utils.exceptions.custom.MissingTokenException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/user/{userId}/profiles")
public class PublicProfileController {
  private final UserProfileService userProfileService;
  private final UserAnimeListService userAnimeListService;
  private final CommentService commentService;
  private final ReviewService reviewService;
  private final AuthService authService;

  @GetMapping
  public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable String userId) {
    return ResponseEntity.ok().body(userProfileService.findUserProfile(userId));
  }

  @GetMapping("/anime-lists")
  public ResponseEntity<List<AnimeListResponse>> getUserAnimeLists(@PathVariable String userId) {
    return ResponseEntity.ok().body(userAnimeListService.findProfileUserAnimeList(userId));
  }

  @GetMapping("/comments")
  public ResponseEntity<List<CommentCardDTO>> getUserComments(@PathVariable String userId) {
    return ResponseEntity.ok().body(commentService.getUserCommentTree(userId));
  }

  @GetMapping("/reviews")
  public ResponseEntity<List<ReviewProfileDTO>> getUserReviews(
      @PathVariable String userId, HttpServletRequest request) {
    try {
      UserCredentials credentials = authService.findCredentials(request);
      String currentUserId = credentials.getId();

      if (currentUserId.equals(userId)) {
        return ResponseEntity.ok().body(reviewService.findByUserId(currentUserId, userId));
      } else {
        return ResponseEntity.ok().body(reviewService.findByUserId(userId));
      }
    } catch (ExpiredJwtException | MissingTokenException e) {
      return ResponseEntity.ok().body(reviewService.findByUserId(userId));
    }
  }
}
