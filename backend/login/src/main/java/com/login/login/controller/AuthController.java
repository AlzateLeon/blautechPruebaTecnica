package com.login.login.controller;

import com.login.login.dtos.LoginRequest;
import com.login.login.dtos.LoginUserDTO;
import com.login.login.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginUserDTO> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
