package com.blautech.alzate.dtos.mappers;

import com.blautech.alzate.dtos.ProductoDTO;
import com.blautech.alzate.models.ProductoEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductoMapper {

    ProductoDTO toDto(ProductoEntity entity);

    ProductoEntity toEntity(ProductoDTO dto);

    List<ProductoDTO> toDtoList(List<ProductoEntity> entities);

    List<ProductoEntity> toEntityList(List<ProductoDTO> dtos);
}
