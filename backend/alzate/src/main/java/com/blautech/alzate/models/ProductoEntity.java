package com.blautech.alzate.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Table(name = "PRODUCTO")
public class ProductoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private String imagen_url;
    private boolean activo;
}
