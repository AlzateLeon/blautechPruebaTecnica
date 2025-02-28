package com.blautech.alzate.services;

import com.blautech.alzate.dtos.LoginRequest;
import com.blautech.alzate.dtos.LoginUserDTO;
import com.blautech.alzate.dtos.UsuarioDTO;
import com.blautech.alzate.models.UsuarioEntity;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface UsuarioService {
    ResponseEntity<UsuarioEntity> registrarUsuario(UsuarioDTO usuario);
    Optional<UsuarioEntity> obtenerUsuarioPorId(Long id);

}
