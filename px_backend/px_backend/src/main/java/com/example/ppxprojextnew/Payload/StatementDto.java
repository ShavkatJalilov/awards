package com.example.ppxprojextnew.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatementDto {

    private String firstName;

    private String lastName;

    private String familyName;

    private String phoneNumber;

    private String dateOfBirth;

    private String town;

    private String maxalla;

    private String location;

    private String comment;

    private String fromPlace;

    private String statement;

    private String staffComment;

    private MultipartFile fingerByte;

    private MultipartFile imageByte;
}
