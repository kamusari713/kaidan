package ru.kaidan.backend.modules.comment.services;

import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.kaidan.backend.modules.anime.entities.Anime;
import ru.kaidan.backend.modules.anime.repositories.AnimeRepository;
import ru.kaidan.backend.modules.comment.DTO.CommentCardDTO;
import ru.kaidan.backend.modules.comment.DTO.CommentDTO;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;
import ru.kaidan.backend.modules.comment.mappers.CommentMapper;
import ru.kaidan.backend.modules.comment.repositories.CommentRepository;
import ru.kaidan.backend.utils.exceptions.custom.NotFoundException;

@Service
@RequiredArgsConstructor
public class CommentService {

  private final AnimeRepository animeRepository;
  private final CommentRepository commentRepository;
  private final CommentMapper commentMapper;

  public List<CommentCardDTO> getUserCommentTree(String userId) {
    return buildUserCommentTree(userId);
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

  public List<CommentCardDTO> buildUserCommentTree(String userId) {
    List<CommentEntity> comments = commentRepository.findByUserId(userId);

    Set<String> shikimoriIds =
        comments.stream()
            .map(CommentEntity::getAnimeId)
            .filter(Objects::nonNull)
            .collect(Collectors.toSet());
    Map<String, String> animeTitleMap = new HashMap<>();
    if (!shikimoriIds.isEmpty()) {
      List<Anime> animeList = animeRepository.findByShikimoriIdIn(shikimoriIds);
      animeTitleMap =
          animeList.stream()
              .collect(
                  Collectors.toMap(
                      Anime::getShikimoriId,
                      anime ->
                          anime.getTitle().getRU() != null
                              ? anime.getTitle().getRU()
                              : "Unknown Anime"));
    }
    return buildCommentTreeForUser(comments, animeTitleMap);
  }

  private List<CommentCardDTO> buildCommentTreeForUser(
      List<CommentEntity> comments, Map<String, String> animeTitleMap) {
    Map<String, CommentCardDTO> map = new HashMap<>();
    List<CommentCardDTO> roots = new ArrayList<>();

    for (CommentEntity entity : comments) {
      CommentCardDTO dto = convertToDTO(entity, animeTitleMap);
      map.put(dto.getId(), dto);
    }

    for (CommentEntity entity : comments) {
      CommentCardDTO dto = map.get(entity.getId());
      if (entity.getParentId() == null) {
        roots.add(dto);
      } else {
        CommentCardDTO parent = map.get(entity.getParentId());
        if (parent != null) {
          parent.getChildren().add(dto);
        }
      }
    }
    Comparator<CommentCardDTO> byDate =
        Comparator.comparing(CommentCardDTO::getCreatedAt).reversed();
    sortUserTree(roots, byDate);

    return roots;
  }

  private CommentCardDTO convertToDTO(CommentEntity entity, Map<String, String> animeTitleMap) {
    return CommentCardDTO.builder()
        .id(entity.getId())
        .userId(entity.getUserId())
        .animeId(entity.getAnimeId())
        .animeTitle(animeTitleMap.get(entity.getAnimeId()))
        .createdAt(entity.getCreatedAt().toString())
        .parentId(entity.getParentId())
        .reviewId(entity.getReviewId())
        .text(entity.getText())
        .userName(entity.getUserName())
        .children(new ArrayList<>())
        .build();
  }

  private void sortUserTree(List<CommentCardDTO> list, Comparator<CommentCardDTO> comparator) {
    list.sort(comparator);
    for (CommentCardDTO comment : list) {
      if (comment.getChildren() != null) {
        sortUserTree(comment.getChildren(), comparator);
      }
    }
  }

  public void deleteComment(String commentId) {
    CommentEntity comment =
        commentRepository
            .findById(commentId)
            .orElseThrow(() -> new NotFoundException("Comment not found"));

    comment.getChildren().forEach(child -> deleteComment(child.getId()));

    commentRepository.delete(comment);
  }
}
