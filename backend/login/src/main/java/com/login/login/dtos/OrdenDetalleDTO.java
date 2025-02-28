package com.login.login.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrdenDetalleDTO {
    private Long id;
    private ProductoDTO productoDTO;
    private int cantidad;
    private BigDecimal precio;
}
