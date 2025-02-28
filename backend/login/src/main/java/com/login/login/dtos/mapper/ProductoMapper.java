package com.login.login.dtos.mapper;

import com.login.login.dtos.ProductoDTO;
import com.login.login.entities.ProductoEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductoMapper {

    ProductoDTO toDto(ProductoEntity entity);

    ProductoEntity toEntity(ProductoDTO dto);

    List<ProductoDTO> toDtoList(List<ProductoEntity> entities);

    List<ProductoEntity> toEntityList(List<ProductoDTO> dtos);
}
