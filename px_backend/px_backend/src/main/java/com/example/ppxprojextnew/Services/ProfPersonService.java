package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.ProfPersonDto;

import java.text.ParseException;
import java.util.UUID;

public interface ProfPersonService {
    ApiResponse addProfPerson(ProfPersonDto profPersonDto, UUID userid);
    ApiResponse updateProfPerson(Long id,ProfPersonDto profPersonDto);
    ApiResponse deleteProfPerson(Long id);
    ApiResponse getProfPersons();
    ApiResponse getIdProfPerson(Long id);
}
