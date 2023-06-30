package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.PersonsDto;
import com.example.ppxprojextnew.Payload.PersonsUpdateDto;

import java.io.IOException;
import java.text.ParseException;
import java.util.UUID;

public interface PersonsService {
    ApiResponse addPersons(PersonsDto personsDto, UUID userid ) throws IOException;
    ApiResponse updatePersons(Long id, PersonsUpdateDto personsDto) throws IOException;
    ApiResponse deletePersons(Long id);
    ApiResponse getPersons();
    ApiResponse getIdPersons(Long id);
}
