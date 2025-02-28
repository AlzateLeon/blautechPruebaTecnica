package com.blautech.alzate.Controllers;

import com.blautech.alzate.dtos.ProductoDTO;
import com.blautech.alzate.models.ProductoEntity;
import com.blautech.alzate.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/listar")
    public ResponseEntity<List<ProductoDTO>> listarProductos() {
        return productoService.listarProductos();
    }

    //crear y editar
    @PostMapping("/crearEditar")
    public ResponseEntity<ProductoEntity> crearProducto(@RequestBody ProductoDTO productoDTO) {
        return productoService.crearProducto(productoDTO);
    }

    @PostMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        return productoService.eliminarProducto(id);
    }

}
