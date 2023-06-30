package com.example.ppxprojextnew.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
public class IdentifyMissingDto {
    private String firstName;
    private String lastName;
    private String familyName;
    private String phoneNumber;
    private String dateOfBirth;
    private String town;
    private String maxalla;
    private String location;
    private String comment;
    private MultipartFile identifyFingerPrint;
    private MultipartFile identifyMissingImages;
}
