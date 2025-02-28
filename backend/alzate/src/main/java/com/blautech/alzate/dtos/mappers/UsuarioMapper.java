package com.blautech.alzate.dtos.mappers;

import com.blautech.alzate.dtos.UsuarioDTO;
import com.blautech.alzate.models.UsuarioEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    UsuarioDTO userToUserDTO(UsuarioEntity user); // Convierte Entidad -> DTO
    UsuarioEntity userDTOToUser(UsuarioDTO userDTO); // Convierte DTO -> Entidad
}
