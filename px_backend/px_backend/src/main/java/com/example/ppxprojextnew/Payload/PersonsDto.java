package com.example.ppxprojextnew.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonsDto {
    private String firstName;
    private String lastName;
    private String familyName;
    private String phoneNumber;
    private String dateOfBirth;
    private String place;
    private String cause;
    private String town;
    private String maxalla;
    private String location;
    private String comment;
    private String witnessName;

    private String witnessLast;

    private String witnessFamily;

    private String witnessTel;

    private MultipartFile personFinger;
    private MultipartFile personImage;

}
