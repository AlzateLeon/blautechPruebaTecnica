package com.blautech.alzate.services;

import com.blautech.alzate.dtos.ProductoDTO;
import com.blautech.alzate.models.ProductoEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductoService {

    ResponseEntity<List<ProductoDTO>> listarProductos();

    ResponseEntity<ProductoEntity> crearProducto(ProductoDTO productoDTO);

    ResponseEntity<Void> eliminarProducto(Long id);
}
