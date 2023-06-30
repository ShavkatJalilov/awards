package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.CatchWantedDTO;
import com.example.ppxprojextnew.Payload.CatchWantedUpdate;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;
import com.example.ppxprojextnew.Repositories.CatchWantedRepository;
import com.example.ppxprojextnew.Services.CatchWantedService;
import com.example.ppxprojextnew.Services.SelectServices;
import com.example.ppxprojextnew.Services.ServiceImpl.CatchWantedImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.UUID;


@CrossOrigin
@Controller
@RequestMapping("/api/v1")
// aniqlangan bedaraklar.
public class CatchWantedController {

    @Autowired
    CatchWantedRepository catchWantedRepository;
    @Autowired
    CatchWantedService catchWantedService;

    @PreAuthorize(value = "ADD_WANTED")
    @PostMapping("/addCathWanted/{userid}")
    public HttpEntity<?> addCathWanted(@ModelAttribute CatchWantedDTO catchWantedDTO, @PathVariable UUID userid) throws IOException {
        ApiResponse apiResponse=catchWantedService.addCatchWanteds(catchWantedDTO, userid);
        return ResponseEntity.ok(apiResponse);
    }

    @PreAuthorize(value = "EDIT_WANTED")
    @PutMapping("/updateCatchWanted/{id}")
    public HttpEntity<?> updateCatchWanted(@PathVariable Long id, @ModelAttribute CatchWantedUpdate catchWantedDTO) throws IOException {
        ApiResponse apiResponse=catchWantedService.updateCatchWanteds(id,catchWantedDTO);
        return ResponseEntity.ok(apiResponse);
    }
    @PreAuthorize(value = "READ_WANTED")
    @GetMapping("/getCatchWanted")
    public HttpEntity<?> getCatchWanted() throws IOException {
        ApiResponse apiResponse=catchWantedService.getAllCatchs();
        return ResponseEntity.ok(apiResponse);
    }
    @PreAuthorize(value = "READ_WANTED")
    @GetMapping("/getIdCatchWanted/{id}")
    public HttpEntity<?> getIdCatchWanted(@PathVariable Long id) throws IOException {
        ApiResponse apiResponse=catchWantedService.getIdCatchWanteds(id);
        return ResponseEntity.ok(apiResponse);
    }
    @PreAuthorize(value = "DELETE_WANTED")
    @DeleteMapping("/deleteCatchWanted/{id}")
    public HttpEntity<?> deleteCatchWanted(@Validated @PathVariable Long id){
        ApiResponse apiResponse=catchWantedService.deleteByID(id);
        return ResponseEntity.ok(apiResponse);
    }


}
