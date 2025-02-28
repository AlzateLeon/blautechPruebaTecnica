package com.blautech.alzate.dtos;

import com.blautech.alzate.models.ProductoEntity;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrdenDetalleDTO {
    private Long id;
    private ProductoDTO productoDTO;
    private int cantidad;
    private BigDecimal precio;
}
