package ru.kaidan.backend.modules.comment.mappers;

import ru.kaidan.backend.modules.comment.DTO.CommentDTO;
import ru.kaidan.backend.modules.comment.entities.CommentEntity;

public interface CommentMapper {

  CommentEntity dtoToEntity(CommentDTO commentDTO);
}
