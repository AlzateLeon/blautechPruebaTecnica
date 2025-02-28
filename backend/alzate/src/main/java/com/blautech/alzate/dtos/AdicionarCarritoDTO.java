package com.blautech.alzate.dtos;

import lombok.Data;

@Data
public class AdicionarCarritoDTO {

    private Long idProducto;
    private Long idUsuario;
    private int cantidad;
}
