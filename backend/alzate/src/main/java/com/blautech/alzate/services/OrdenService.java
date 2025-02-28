package com.blautech.alzate.services;


import com.blautech.alzate.dtos.AdicionarCarritoDTO;
import com.blautech.alzate.dtos.LoginUserDTO;
import com.blautech.alzate.models.OrdenEntity;
import org.springframework.http.ResponseEntity;

public interface OrdenService {
    public ResponseEntity<OrdenEntity> agregarCarrito(AdicionarCarritoDTO orden);

    ResponseEntity<OrdenEntity> pagarOrden(Long idUsuario);

    ResponseEntity<OrdenEntity> eliminarDelCarrito(Long idOrdenDetalle);

    ResponseEntity<LoginUserDTO> consultarCarritoActual(Long idUsuario);
}
