package com.blautech.alzate.Controllers;

import com.blautech.alzate.dtos.UsuarioDTO;
import com.blautech.alzate.models.UsuarioEntity;
import com.blautech.alzate.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioEntity> registrarUsuario(@RequestBody UsuarioDTO usuario) {
        return usuarioService.registrarUsuario(usuario);
    }

}
