package com.example.ppxprojextnew.Payload;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class GuardsDto {
    private String firstName;
    private String lastName;
    private String familyName;
    private String phoneNumber;
    private String town;
    private String maxalla;
    private String location;
    private String comment;
}
