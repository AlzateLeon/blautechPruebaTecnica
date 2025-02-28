package com.login.login.services.impl;

import com.login.login.config.JwtService;
import com.login.login.dtos.*;
import com.login.login.dtos.mapper.OrdenMapper;
import com.login.login.dtos.mapper.ProductoMapper;
import com.login.login.dtos.mapper.UsuarioMapper;
import com.login.login.entities.OrdenDetalleEntity;
import com.login.login.entities.OrdenEntity;
import com.login.login.entities.UsuarioEntity;
import com.login.login.repository.OrdenDetalleRepository;
import com.login.login.repository.OrdenRepository;
import com.login.login.repository.UsuarioRepository;
import com.login.login.services.AuthService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class authServiceImpl implements AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private OrdenDetalleRepository ordenDetalleRepository;

    private final UsuarioMapper userMapper;
    private final ProductoMapper productoMapper;
    private final OrdenMapper ordenMapper;

    @Autowired
    public authServiceImpl() {
        this.userMapper = Mappers.getMapper(UsuarioMapper.class);
        this.productoMapper = Mappers.getMapper(ProductoMapper.class);
        this.ordenMapper = Mappers.getMapper(OrdenMapper.class);
    }

    @Override
    public ResponseEntity<LoginUserDTO> login(LoginRequest request) {

        LoginUserDTO login = new LoginUserDTO();
        UsuarioEntity user = usuarioRepository.buscarPorEmailYPassword(
                request.getUsername(), request.getPassword()).orElseThrow(() -> new RuntimeException("Credenciales incorrectas"));

        if (user != null) {
            UserDetails userDetails = org.springframework.security.core.userdetails.User
                    .withUsername(user.getEmail()) // Usa el email o el username
                    .password(user.getPassword()) // Opcional si es necesario
                    .authorities(new ArrayList<>()) // Agrega roles si los tienes
                    .build();
            String token = jwtService.generateToken(userDetails);
            login.setToken(new TokenResponse(token));
            login.setUsuarioDTO(userMapper.userToUserDTO(user));

            //consultamos la orden actual (carrito)
            Optional<OrdenEntity> ordenEntity =  ordenRepository.findByUsuarioIdAndPagadoFalse(
                    user.getId());

            if(ordenEntity.isPresent()){

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
            }

            //se consultan las ordenes pagadas
            List<OrdenEntity>  listOrdenes = ordenRepository.findByUsuarioIdAndPagadoTrue(user.getId());
            login.setOrdenesPagadas(ordenMapper.toDtoList(listOrdenes));

        }

        return ResponseEntity.ok(login);
    }
}
