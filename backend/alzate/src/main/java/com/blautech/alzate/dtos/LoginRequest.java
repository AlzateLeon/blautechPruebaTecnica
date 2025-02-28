package com.blautech.alzate.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


public class LoginRequest {
    private String username;
    private String password;
    // Getters y setters


    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}