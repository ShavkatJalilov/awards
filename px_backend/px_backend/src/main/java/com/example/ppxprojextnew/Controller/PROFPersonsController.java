package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.ProfPersonDto;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;
import com.example.ppxprojextnew.Repositories.Prof_persons_repository;
import com.example.ppxprojextnew.Services.ProfPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.UUID;

@CrossOrigin
@Controller
@RequestMapping("/api/PROFPersons")

public class PROFPersonsController {
    @Autowired
    Prof_persons_repository prof_persons_repository;

    @Autowired
    ProfPersonService profPersonService;

    @PostMapping("/add/{userid}")
    public HttpEntity<?> addProf(@Validated @ModelAttribute ProfPersonDto profPersonDto, @PathVariable UUID userid){
        ApiResponse apiResponse = profPersonService.addProfPerson(profPersonDto, userid);
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/update/{id}")
    public HttpEntity<?> updateProf(@Validated @ModelAttribute ProfPersonDto profPersonDto, @PathVariable Long id){
        ApiResponse apiResponse = profPersonService.updateProfPerson(id, profPersonDto);
        return ResponseEntity.ok(apiResponse);
    }
    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteProf(@Validated @PathVariable Long id){
        ApiResponse apiResponse = profPersonService.deleteProfPerson(id);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/getProf")
    public HttpEntity<?> getPROF(){
        ApiResponse profPersons = profPersonService.getProfPersons();
        return ResponseEntity.ok(profPersons);
    }

    @GetMapping("/getIdProf/{id}")
    public HttpEntity<?> getIdPROF(@PathVariable Long id){
        ApiResponse profPersons = profPersonService.getIdProfPerson(id);
        return ResponseEntity.ok(profPersons);
    }
}
