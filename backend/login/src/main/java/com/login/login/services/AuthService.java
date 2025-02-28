package com.login.login.services;

import com.login.login.dtos.LoginRequest;
import com.login.login.dtos.LoginUserDTO;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<LoginUserDTO> login(LoginRequest request);
}
