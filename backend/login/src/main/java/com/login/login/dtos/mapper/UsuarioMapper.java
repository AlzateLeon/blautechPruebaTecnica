package com.login.login.dtos.mapper;

import com.login.login.dtos.UsuarioDTO;
import com.login.login.entities.UsuarioEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {
    UsuarioDTO userToUserDTO(UsuarioEntity user); // Convierte Entidad -> DTO
    UsuarioEntity userDTOToUser(UsuarioDTO userDTO); // Convierte DTO -> Entidad
}
