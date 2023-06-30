package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.PersonsDto;
import com.example.ppxprojextnew.Payload.PersonsUpdateDto;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;
import com.example.ppxprojextnew.Repositories.PersonsRepository;
import com.example.ppxprojextnew.Services.PersonsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.UUID;

@CrossOrigin
@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1")
//ro`yxatga olish
public class PersonsController {
    @Autowired
    PersonsRepository personsRepository;

    @Autowired
    PersonsService personsService;

    @PostMapping("/addPerson/{userid}")
    public HttpEntity<?> addPerson(@Validated @ModelAttribute PersonsDto personsDto, @PathVariable UUID userid) throws IOException {
        ApiResponse apiResponse=personsService.addPersons(personsDto, userid);
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/updatePerson/{id}")
    public HttpEntity<?> updatePerson(@Validated @PathVariable Long id,@ModelAttribute PersonsUpdateDto personsDto) throws IOException {
        ApiResponse apiResponse=personsService.updatePersons(id,personsDto);
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/getAllPerson")
    public HttpEntity<?> updatePerson() throws IOException {
        ApiResponse apiResponse=personsService.getPersons();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/getIdPerson/{id}")
    public HttpEntity<?> getIdPerson( @Validated @PathVariable Long id) throws IOException {
        ApiResponse apiResponse=personsService.getIdPersons(id);
        return ResponseEntity.ok(apiResponse);
    }
    @DeleteMapping("/deletePerson/{id}")
    public HttpEntity<?> deletePerson(@Validated @PathVariable Long id){
        ApiResponse apiResponse=personsService.deletePersons(id);
        return ResponseEntity.ok(apiResponse);
    }
}