package com.blautech.alzate.services.impl;

import com.blautech.alzate.dtos.ProductoDTO;
import com.blautech.alzate.dtos.mappers.ProductoMapper;
import com.blautech.alzate.dtos.mappers.UsuarioMapper;
import com.blautech.alzate.models.ProductoEntity;
import com.blautech.alzate.repositories.ProductoRepository;
import com.blautech.alzate.services.ProductoService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    private final ProductoMapper productoMapper;

    @Autowired
    public ProductoServiceImpl() {
        this.productoMapper = Mappers.getMapper(ProductoMapper.class);
    }

    @Override
    public ResponseEntity<List<ProductoDTO>> listarProductos() {
        return ResponseEntity.ok(productoMapper.toDtoList(productoRepository.findByActivoTrue()));
    }

    @Override
    public ResponseEntity<ProductoEntity> crearProducto(ProductoDTO productoDTO) {
        ProductoEntity productoEntity = productoMapper.toEntity(productoDTO);
        productoEntity.setActivo(Boolean.TRUE);
        return ResponseEntity.ok(productoRepository.save(productoEntity));
    }

    @Override
    public ResponseEntity<Void> eliminarProducto(Long id) {

        Optional<ProductoEntity> producto = productoRepository.findById(id);
        if (producto.isPresent()){
            ProductoEntity productoEntity = producto.get();
            productoEntity.setActivo(Boolean.FALSE);
            productoRepository.save(productoEntity);
        }
        return ResponseEntity.ok(null);
    }
}
