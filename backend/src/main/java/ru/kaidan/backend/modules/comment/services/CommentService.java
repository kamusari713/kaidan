package ru.kaidan.backend.modules.comment.services;

import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.comment.DTO.CommentDTO;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;
import ru.kaidan.backend.modules.comment.mappers.CommentMapper;
import ru.kaidan.backend.modules.comment.repositories.CommentRepository;

@Service
@RequiredArgsConstructor
public class CommentService {

  private final CommentRepository commentRepository;
  private final CommentMapper commentMapper;

  public List<CommentEntity> getUserCommentTree(String userId) {
    List<CommentEntity> comments = commentRepository.findByAnimeId(userId);
    return buildCommentTree(comments);
  }

  public List<CommentEntity> getAnimeCommentTree(String animeId) {
    List<CommentEntity> comments = commentRepository.findByAnimeId(animeId);
    return buildCommentTree(comments);
  }

  public List<CommentEntity> getReviewCommentTree(String reviewId) {
    return buildCommentTree(commentRepository.findByReviewId(reviewId));
  }

  public CommentEntity createComment(CommentDTO commentDTO) {
    CommentEntity newComment = commentMapper.dtoToEntity(commentDTO);
    return commentRepository.save(newComment);
  }

  private List<CommentEntity> buildCommentTree(List<CommentEntity> comments) {
    Map<String, CommentEntity> map = new HashMap<>();
    List<CommentEntity> roots = new ArrayList<>();

    for (CommentEntity comment : comments) {
      comment.setChildren(new ArrayList<>());
      map.put(comment.getId(), comment);
    }

    for (CommentEntity comment : comments) {
      if (comment.getParentId() == null) {
        roots.add(comment);
      } else {
        CommentEntity parent = map.get(comment.getParentId());
        if (parent != null) {
          parent.getChildren().add(comment);
        }
      }
    }

    Comparator<CommentEntity> byDate = Comparator.comparing(CommentEntity::getCreatedAt).reversed();

    sortTree(roots, byDate);

    return roots;
  }

  private void sortTree(List<CommentEntity> list, Comparator<CommentEntity> comparator) {
    list.sort(comparator);
    for (CommentEntity comment : list) {
      if (comment.getChildren() != null) {
        sortTree(comment.getChildren(), comparator);
      }
    }
  }
}
