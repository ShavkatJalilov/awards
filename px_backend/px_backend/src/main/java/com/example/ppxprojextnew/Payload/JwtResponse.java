package com.example.ppxprojextnew.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer ";
    private UUID id;
    private String email;
    private String roles;
    private String name;
    private String lastname;


    public JwtResponse(String token, UUID id, String email, String roles, String name, String lastname) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.roles = roles;
        this.name=name;
        this.lastname=lastname;
    }
}