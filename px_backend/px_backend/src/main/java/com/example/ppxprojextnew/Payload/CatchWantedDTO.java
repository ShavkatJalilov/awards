package com.example.ppxprojextnew.Payload;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CatchWantedDTO {
    private String firstName;
    private String lastName;
    private String familyName;
    private String phoneNumber;
    private String town;
    private String maxalla;
    private String location;
    private String comment;
    private MultipartFile cathWantedImages;
    private MultipartFile wantedFingerPrint;

    public CatchWantedDTO(String firstName, String lastName, String familyName, String phoneNumber, String town, String maxalla, String location, String comment) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.familyName = familyName;
        this.phoneNumber = phoneNumber;
        this.town = town;
        this.maxalla = maxalla;
        this.location = location;
        this.comment = comment;
    }
}
