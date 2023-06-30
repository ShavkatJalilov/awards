package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.IdentifyMissingDto;
import com.example.ppxprojextnew.Payload.IdentifyMissingUpdate;

import java.io.IOException;
import java.text.ParseException;
import java.util.UUID;

public interface IdentifyMissingService {

    ApiResponse addIdentifyMissing(IdentifyMissingDto identifyMissingDto, UUID userid) throws IOException;
    ApiResponse updateIdentifyMissing(Long id, IdentifyMissingUpdate identifyMissingDto) throws IOException;
    ApiResponse deleteIdentifyMissing(Long id);
    ApiResponse getIdentifyMissing();
    ApiResponse getIdIdentifyMissing(Long id);
    }
