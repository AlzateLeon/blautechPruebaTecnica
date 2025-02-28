package com.blautech.alzate.dtos;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class OrdenDTO {
    private Long id;
    private BigDecimal total;
    private boolean pagado;
    private List<OrdenDetalleDTO> ordenes;
    private LocalDate fechaPago;
}
