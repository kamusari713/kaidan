package ru.kaidan.backend.modules.user.controllers;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;
import ru.kaidan.backend.modules.comment.services.CommentService;
import ru.kaidan.backend.modules.review.entities.ReviewEntity;
import ru.kaidan.backend.modules.review.services.ReviewService;
import ru.kaidan.backend.modules.user.DTO.AnimeListResponse;
import ru.kaidan.backend.modules.user.DTO.UserProfileBioRequest;
import ru.kaidan.backend.modules.user.DTO.UserProfileResponse;
import ru.kaidan.backend.modules.user.DTO.UserProfileUsernameRequest;
import ru.kaidan.backend.modules.user.services.UserAnimeListService;
import ru.kaidan.backend.modules.user.services.UserProfileService;

@RestController
@RequestMapping("/api/public/user/profile")
@RequiredArgsConstructor
public class UserProfileController {
  private final UserProfileService userProfileService;
  private final UserAnimeListService userAnimeListService;
  private final CommentService commentService;
  private final ReviewService reviewService;

  @PostMapping("/username")
  public UserProfileResponse updateUsername(
      @RequestBody UserProfileUsernameRequest usernameRequest) {
    return userProfileService.updateUsername(usernameRequest);
  }

  @PostMapping("/bio")
  public UserProfileResponse updateUserBio(@RequestBody UserProfileBioRequest bioRequest) {
    return userProfileService.updateUserBio(bioRequest);
  }

  @GetMapping
  public UserProfileResponse getUserProfile(@RequestParam String userId) {
    return userProfileService.findUserProfile(userId);
  }

  @GetMapping("/anime-lists/{userId}")
  public List<AnimeListResponse> getUserAnimeLists(@PathVariable String userId) {
    return userAnimeListService.findProfileUserAnimeList(userId);
  }

  @GetMapping("/comments/{userId}")
  public List<CommentEntity> getUserComments(@PathVariable String userId) {
    return commentService.getUserCommentTree(userId);
  }

  @GetMapping("/reviews/{userId}")
  public List<ReviewEntity> getUserReviews(@PathVariable String userId) {
    return reviewService.findByUser(userId);
  }
}
