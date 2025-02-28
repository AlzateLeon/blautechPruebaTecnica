package com.login.login.dtos;

import lombok.Data;

import java.util.List;

@Data
public class LoginUserDTO {
    private TokenResponse token;
    private UsuarioDTO usuarioDTO;
    private OrdenDTO ordenActual;
    private List<OrdenDTO> ordenesPagadas;
}
