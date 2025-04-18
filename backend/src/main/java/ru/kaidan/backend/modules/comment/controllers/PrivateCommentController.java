package ru.kaidan.backend.modules.comment.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kaidan.backend.modules.comment.DTO.CommentDTO;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;
import ru.kaidan.backend.modules.comment.services.CommentService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/comments")
public class PrivateCommentController {
  private final CommentService commentService;

  @PostMapping
  public ResponseEntity<CommentEntity> createComment(@RequestBody CommentDTO commentDTO) {
    return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(commentDTO));
  }
}
