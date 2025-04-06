package ru.kaidan.backend.modules.comment.controllers;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kaidan.backend.modules.comment.DTO.CommentDTO;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;
import ru.kaidan.backend.modules.comment.services.CommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/comment")
public class CommentController {

  private final CommentService commentService;

  @GetMapping("/anime/{animeId}")
  public List<CommentEntity> getAnimeComments(@PathVariable String animeId) {
    return commentService.getAnimeCommentTree(animeId);
  }

  @GetMapping("/review/{reviewId}")
  public List<CommentEntity> getReviewComments(@PathVariable String reviewId) {
    return commentService.getReviewCommentTree(reviewId);
  }

  @PostMapping("/new")
  public ResponseEntity<CommentEntity> addComment(@RequestBody CommentDTO commentDTO) {
    CommentEntity commentEntity = commentService.addComment(commentDTO);
    return ResponseEntity.ok(commentEntity);
  }
}
