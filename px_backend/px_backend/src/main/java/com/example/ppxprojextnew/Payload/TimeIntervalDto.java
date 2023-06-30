package com.example.ppxprojextnew.Payload;

import lombok.Data;

@Data
public class TimeIntervalDto {
    private String day;
    private String month;
    private String year;
    private String startH;
    private String endH;
    private String town;
    private String maxalla;
}
//`http://localhost:8081/api/v1/getCatchTime/${SelectKategory}`
