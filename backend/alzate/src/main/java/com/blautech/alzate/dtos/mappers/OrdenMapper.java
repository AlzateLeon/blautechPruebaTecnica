package com.blautech.alzate.dtos.mappers;

import com.blautech.alzate.dtos.OrdenDTO;
import com.blautech.alzate.dtos.ProductoDTO;
import com.blautech.alzate.models.OrdenEntity;
import com.blautech.alzate.models.ProductoEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrdenMapper {

    OrdenDTO toDto(OrdenEntity entity);

    OrdenEntity toEntity(OrdenDTO dto);

    List<OrdenDTO> toDtoList(List<OrdenEntity> entities);

    List<OrdenEntity> toEntityList(List<OrdenDTO> dtos);
}
