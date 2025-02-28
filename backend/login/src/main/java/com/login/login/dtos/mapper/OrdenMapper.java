package com.login.login.dtos.mapper;

import com.login.login.dtos.OrdenDTO;
import com.login.login.entities.OrdenEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrdenMapper {

    OrdenDTO toDto(OrdenEntity entity);

    OrdenEntity toEntity(OrdenDTO dto);

    List<OrdenDTO> toDtoList(List<OrdenEntity> entities);

    List<OrdenEntity> toEntityList(List<OrdenDTO> dtos);
}
