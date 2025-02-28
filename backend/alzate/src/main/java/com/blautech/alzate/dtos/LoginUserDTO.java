package com.blautech.alzate.dtos;

import com.blautech.alzate.models.OrdenEntity;
import lombok.Data;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Data
public class LoginUserDTO {
    private TokenResponse token;
    private UsuarioDTO usuarioDTO;
    private OrdenDTO ordenActual;
    private List<OrdenDTO> ordenesPagadas;
}
