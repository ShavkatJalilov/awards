package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.text.ParseException;
import java.util.UUID;

public interface SelectServices {
    ApiResponse getStaffScore(UUID userid, Long id );
    ApiResponse getTime(TimeIntervalDto timeIntervalDto, Long id) throws ParseException;
    ApiResponse getArchive(Long id, String from, String to);


}
