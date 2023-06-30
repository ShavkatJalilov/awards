package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.GuardsDto;
import com.example.ppxprojextnew.Services.GuardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

@CrossOrigin
@Controller
@RequestMapping("/api/guards")
//qorovullarniki
public class GuardsController {

    @Autowired
    GuardsService guardsService;

    @PostMapping("/addGuards/{userid}")
    public HttpEntity<?> addGuards(@Validated @ModelAttribute GuardsDto guardsDto,@PathVariable UUID userid) throws IOException {
        ApiResponse apiResponse=guardsService.addGuards(guardsDto, userid);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/getGuard/{id}")
    public HttpEntity<?> getGuard(@Validated @PathVariable Long id){
        ApiResponse idGuards = guardsService.getIdGuards(id);
        return ResponseEntity.ok(idGuards);
    }

    @PutMapping("/updateGuard/{id}")
    public HttpEntity<?> updateGuard(@Validated @ModelAttribute GuardsDto guardsDto, @PathVariable Long id) throws IOException {
        ApiResponse apiResponse = guardsService.updateGuards(id, guardsDto);
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/deleteGuards/{id}")
    public HttpEntity<?> deleteGuard(@Validated @PathVariable Long id){
        ApiResponse apiResponse = guardsService.deleteGuards(id);
        return ResponseEntity.ok(apiResponse);
    }
}
