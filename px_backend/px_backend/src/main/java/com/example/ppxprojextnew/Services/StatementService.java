package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.StatementDto;
import com.example.ppxprojextnew.Payload.StatementUpdate;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.UUID;

public interface StatementService {
    ApiResponse addStatement(StatementDto statementDto, UUID userid) throws IOException;
    ApiResponse updateStatement(Long id, StatementUpdate statementDto) throws IOException;
    ApiResponse deleteStatement(Long id);
    ApiResponse getStatements();
    ApiResponse getIdStatement(Long id);
    ApiResponse getTime(
            String town,
            String maxalla,
            String day,
            String month,
            String year,
            String startT,
            String endT) throws ParseException;
}
