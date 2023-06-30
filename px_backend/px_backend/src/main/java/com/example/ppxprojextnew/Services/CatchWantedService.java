package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.CatchWantedDTO;
import com.example.ppxprojextnew.Payload.CatchWantedUpdate;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;

import java.io.IOException;
import java.text.ParseException;
import java.util.UUID;

public interface CatchWantedService {
    ApiResponse addCatchWanteds(CatchWantedDTO catchWantedDTO, UUID userid) throws IOException;
    ApiResponse deleteByID(Long id);
    ApiResponse updateCatchWanteds(Long id, CatchWantedUpdate catchWantedDTO) throws IOException;

    ApiResponse getAllCatchs();
    ApiResponse getIdCatchWanteds(Long id);
}
