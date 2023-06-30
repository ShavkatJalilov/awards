package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.GuardsDto;
import com.example.ppxprojextnew.Payload.StatementDto;

import java.io.IOException;
import java.text.ParseException;
import java.util.UUID;

public interface GuardsService {
    ApiResponse addGuards(GuardsDto guardsDto, UUID userid) throws IOException;
    ApiResponse updateGuards(Long id,GuardsDto guardsDto) throws IOException;
    ApiResponse deleteGuards(Long id);
    ApiResponse getGuards();
    ApiResponse getIdGuards(Long id);
}
