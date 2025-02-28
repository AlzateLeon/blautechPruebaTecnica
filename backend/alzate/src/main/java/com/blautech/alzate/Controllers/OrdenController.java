package com.blautech.alzate.Controllers;

import com.blautech.alzate.dtos.AdicionarCarritoDTO;
import com.blautech.alzate.dtos.LoginUserDTO;
import com.blautech.alzate.models.OrdenEntity;
import com.blautech.alzate.services.OrdenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orden")
@CrossOrigin(origins = "http://localhost:5173")
public class OrdenController {

    @Autowired
    private OrdenService ordenService;

    @PostMapping("/guardar")
    public ResponseEntity<OrdenEntity> agregarCarrito(@RequestBody AdicionarCarritoDTO orden) {
        return ordenService.agregarCarrito(orden);
    }

    @PostMapping("/pagar")
    public ResponseEntity<OrdenEntity> pagarOrden(@RequestParam Long idUsuario) {
        return ordenService.pagarOrden(idUsuario);
    }

    @PostMapping("/eliminarDelCarrito")
    public ResponseEntity<OrdenEntity> eliminarDelCarrito(@RequestParam Long idOrdenDetalle) {
        return ordenService.eliminarDelCarrito(idOrdenDetalle);
    }

    @GetMapping("/consultarCarrito")
    public ResponseEntity<LoginUserDTO> consultarCarritoActual(@RequestParam Long idUsuario){
        return ordenService.consultarCarritoActual(idUsuario);
    }
}
