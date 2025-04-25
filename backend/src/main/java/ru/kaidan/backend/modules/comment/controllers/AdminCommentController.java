package ru.kaidan.backend.modules.comment.controllers;

import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.comment.services.CommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/comments")
public class AdminCommentController {
  private final CommentService commentService;

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Null> deleteComment(@PathVariable String commentId) {
    commentService.deleteComment(commentId);
    return ResponseEntity.noContent().build();
  }
}
