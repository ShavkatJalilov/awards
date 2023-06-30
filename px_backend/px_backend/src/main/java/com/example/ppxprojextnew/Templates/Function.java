package com.example.ppxprojextnew.Templates;

import org.springframework.context.annotation.Bean;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Function {
    @Bean
    public Timestamp createTime(String time){
        String stringDate = time;
        //creating date format
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        //parsing string to date using parse() method
        Date parsedDate = null;
        try {
            parsedDate = dateFormat.parse(stringDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        //finally creating a timestamp
        Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
        return timestamp;
    }
}
