package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.CheckedWeaponsDTO;
import com.example.ppxprojextnew.Repositories.CheckedWeaponsRepository;
import com.example.ppxprojextnew.Services.CheckedWeaponsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin
@Controller
@RequestMapping("/api/CheckWeapons")
// tekshirilgan ov qurollari
public class CheckedWeaponsController {
    @Autowired
    CheckedWeaponsRepository checkedWeaponsRepository;
    @Autowired
    CheckedWeaponsService checkedWeaponsService;
    @PostMapping("/add/{userid}")
    public HttpEntity<?> addCHeckWeapons(@Validated @ModelAttribute CheckedWeaponsDTO checkedWeaponsDTO, @PathVariable UUID userid){
        ApiResponse apiResponse = checkedWeaponsService.addWeapons(checkedWeaponsDTO, userid);
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/update/{id}")
    public HttpEntity<?> update(@Validated @ModelAttribute CheckedWeaponsDTO checkedWeaponsDTO, @PathVariable Long id){
        ApiResponse update = checkedWeaponsService.update(id, checkedWeaponsDTO);
        return ResponseEntity.ok(update);
    }
    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteById(@Validated @PathVariable Long id){
        ApiResponse delete = checkedWeaponsService.delete(id);
        return ResponseEntity.ok(delete);
    }
    @GetMapping("/get")
    public HttpEntity<?> getWeapons(){
        ApiResponse weapons = checkedWeaponsService.getWeapons();
        return ResponseEntity.ok(weapons);
    }
    @GetMapping("/getid/{id}")
    public HttpEntity<?> getidWeapons(@Validated @PathVariable Long id){
        ApiResponse weapons = checkedWeaponsService.getIdWeapons(id);
        return ResponseEntity.ok(weapons);
    }
}
