package ru.kaidan.backend.Mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import ru.kaidan.backend.Entities.Anime;
import ru.kaidan.backend.Models.AnimePatchDTO;

@Mapper(componentModel = "spring")
public interface AnimeMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Anime patchDTOtoEntity(AnimePatchDTO animePatchDTO);

    AnimePatchDTO toDTO(Anime anime);
}
