package com.blautech.alzate.services.impl;

import com.blautech.alzate.config.JwtService;
import com.blautech.alzate.dtos.*;
import com.blautech.alzate.dtos.mappers.OrdenMapper;
import com.blautech.alzate.dtos.mappers.ProductoMapper;
import com.blautech.alzate.dtos.mappers.UsuarioMapper;
import com.blautech.alzate.models.OrdenDetalleEntity;
import com.blautech.alzate.models.OrdenEntity;
import com.blautech.alzate.models.UsuarioEntity;
import com.blautech.alzate.repositories.OrdenDetalleRepository;
import com.blautech.alzate.repositories.OrdenRepository;
import com.blautech.alzate.repositories.UsuarioRepository;
import com.blautech.alzate.services.UsuarioService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final UsuarioMapper userMapper;
    private final ProductoMapper productoMapper;
    private final OrdenMapper ordenMapper;

    @Autowired
    public UsuarioServiceImpl() {
        this.userMapper = Mappers.getMapper(UsuarioMapper.class);
        this.productoMapper = Mappers.getMapper(ProductoMapper.class);
        this.ordenMapper = Mappers.getMapper(OrdenMapper.class);
    }

    @Override
    public ResponseEntity<UsuarioEntity> registrarUsuario(UsuarioDTO usuarioDTO) {

        UsuarioEntity user = userMapper.userDTOToUser(usuarioDTO);
        return ResponseEntity.ok(usuarioRepository.save(user));
    }

    @Override
    public Optional<UsuarioEntity> obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

}
