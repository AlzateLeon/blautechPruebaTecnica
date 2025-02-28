package com.blautech.alzate.services.impl;

import com.blautech.alzate.dtos.AdicionarCarritoDTO;
import com.blautech.alzate.dtos.LoginUserDTO;
import com.blautech.alzate.dtos.OrdenDTO;
import com.blautech.alzate.dtos.OrdenDetalleDTO;
import com.blautech.alzate.dtos.mappers.ProductoMapper;
import com.blautech.alzate.models.OrdenDetalleEntity;
import com.blautech.alzate.models.OrdenEntity;
import com.blautech.alzate.models.ProductoEntity;
import com.blautech.alzate.repositories.OrdenDetalleRepository;
import com.blautech.alzate.repositories.OrdenRepository;
import com.blautech.alzate.repositories.ProductoRepository;
import com.blautech.alzate.repositories.UsuarioRepository;
import com.blautech.alzate.services.OrdenService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrdenServiceImpl implements OrdenService {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private OrdenDetalleRepository ordenDetalleRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final ProductoMapper productoMapper;
    @Autowired
    public OrdenServiceImpl() {
        this.productoMapper = Mappers.getMapper(ProductoMapper.class);
    }

    @Override
    public ResponseEntity<OrdenEntity> agregarCarrito(AdicionarCarritoDTO orden) {
        //validamos si ya existe una orden existente
        Optional<OrdenEntity> ordenEntity =  ordenRepository.findByUsuarioIdAndPagadoFalse(
                orden.getIdUsuario());
        Optional<ProductoEntity> productoEntity = productoRepository.findById(orden.getIdProducto());
        ProductoEntity producto = productoEntity.get();

        if (ordenEntity.isPresent()){
            OrdenEntity entity = ordenEntity.get();
            //se crea una orden detalle relacionada a la orden
            crearOrdenDetalle(orden, entity, producto);

            //se actualiza el total de la orden
            entity.setTotal(entity.getTotal().add(producto.getPrecio().multiply(BigDecimal.valueOf(orden.getCantidad()))));
            return ResponseEntity.ok(ordenRepository.save(entity));
        }else{
            //se crea la orden
            OrdenEntity entity = new OrdenEntity();
            entity.setUsuario(usuarioRepository.findById(orden.getIdUsuario()).get());
            entity.setPagado(false);
            entity.setTotal(producto.getPrecio().multiply(BigDecimal.valueOf(orden.getCantidad())));
            ordenRepository.save(entity);

            //se crea una orden detalle relacionada a la orden
            crearOrdenDetalle(orden, entity, producto);
            return ResponseEntity.ok(entity);
        }
    }

    @Override
    public ResponseEntity<OrdenEntity> pagarOrden(Long idUsuario) {
        // Recuperamos la orden por id usuario
        OrdenEntity ordenEntity = ordenRepository.findByUsuarioIdAndPagadoFalse(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no cuenta con un carrito pendiente"));

        ordenEntity.setPagado(true);
        ordenEntity.setFechaPago(LocalDate.now());
        return  ResponseEntity.ok(ordenRepository.save(ordenEntity));
    }

    @Override
    public ResponseEntity<OrdenEntity> eliminarDelCarrito(Long idOrdenDetalle) {
        OrdenDetalleEntity ordenDetalle = ordenDetalleRepository.findById(idOrdenDetalle)
                .orElseThrow(() -> new RuntimeException("OrdenDetalle no encontrado"));

        OrdenEntity orden = ordenDetalle.getOrden();

        // Restar el precio del producto eliminado al total de la orden
        orden.setTotal(orden.getTotal().subtract(
                ordenDetalle.getProducto().getPrecio().multiply(BigDecimal.valueOf(ordenDetalle.getCantidad()))
        ));

        // Eliminar el detalle
        ordenDetalleRepository.delete(ordenDetalle);

        // Guardar la orden con el nuevo total actualizado
        ordenRepository.save(orden);

        return ResponseEntity.ok(orden);
    }

    @Override
    public ResponseEntity<LoginUserDTO> consultarCarritoActual(Long idUsuario) {
        LoginUserDTO login = new LoginUserDTO();

        //consultamos la orden actual (carrito)
        Optional<OrdenEntity> ordenEntity =  ordenRepository.findByUsuarioIdAndPagadoFalse(
                idUsuario);

        //se consultan las ordenes detalle
        List<OrdenDetalleEntity> ordenesDetalle =  ordenDetalleRepository.findProductosByOrdenId(ordenEntity.get().getId());
        List<OrdenDetalleDTO> ordenes = new ArrayList<>();

        for (OrdenDetalleEntity orden :ordenesDetalle) {
            OrdenDetalleDTO ordenDetalleDTO = new OrdenDetalleDTO();
            ordenDetalleDTO.setId(orden.getId());
            ordenDetalleDTO.setProductoDTO(productoMapper.toDto(orden.getProducto()));
            ordenDetalleDTO.setCantidad(orden.getCantidad());
            ordenDetalleDTO.setPrecio(orden.getPrecio());
            ordenes.add(ordenDetalleDTO);
        }

        OrdenDTO ordenActualDTO = new OrdenDTO();
        ordenActualDTO.setId(ordenEntity.get().getId());
        ordenActualDTO.setTotal(ordenEntity.get().getTotal());
        ordenActualDTO.setPagado(ordenEntity.get().isPagado());
        ordenActualDTO.setOrdenes(ordenes);

        login.setOrdenActual(ordenActualDTO);
        return ResponseEntity.ok(login);
    }

    private void crearOrdenDetalle(AdicionarCarritoDTO orden, OrdenEntity ordenEntity,
                                   ProductoEntity productoEntity) {

        OrdenDetalleEntity ordenDetalle = new OrdenDetalleEntity();
        ordenDetalle.setOrden(ordenEntity);
        ordenDetalle.setCantidad(orden.getCantidad());
        ordenDetalle.setProducto(productoEntity);
        ordenDetalle.setPrecio(productoEntity.getPrecio());
        ordenDetalleRepository.save(ordenDetalle);
    }
}
