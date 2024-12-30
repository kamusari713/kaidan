package ru.kaidan.backend.Mappers;


import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import ru.kaidan.backend.Entities.User;
import ru.kaidan.backend.Enums.SexType;
import ru.kaidan.backend.Models.UserPatchDTO;

@Mapper(componentModel = "spring", imports = {SexType.class})
public interface UserMapper {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User patchDTOtoEntity(UserPatchDTO DTO);

    UserPatchDTO toDTO(User user);
}
