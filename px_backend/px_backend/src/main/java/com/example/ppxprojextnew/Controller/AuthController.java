package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.JwtResponse;
import com.example.ppxprojextnew.Payload.LoginDto;
import com.example.ppxprojextnew.Payload.StaffsDTO;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Services.StaffsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@CrossOrigin
@Controller
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    StaffsRepository staffsRepository;
    @Autowired
    StaffsService staffsService;

    @PostMapping("/login")
    public HttpEntity<?> login(@Validated @RequestBody LoginDto loginDTO){
        JwtResponse jwtResponse = staffsService.loginUser(loginDTO);
        return ResponseEntity.ok(jwtResponse);
    }

    @GetMapping("/getStaffName/{id}")
    public HttpEntity<?> getName(@Validated @PathVariable UUID id){
        ApiResponse staffName = staffsService.getStaffName(id);
        return ResponseEntity.ok(staffName);
    }

    @PostMapping("/add")
    public HttpEntity<?> creat(@Validated @ModelAttribute StaffsDTO staffsDTO){
        ApiResponse apiResponse = staffsService.creatStaff(staffsDTO);
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/update/{id}")
    public HttpEntity<?> update(@Validated @ModelAttribute StaffsDTO staffsDTO, @PathVariable UUID id){
        ApiResponse apiResponse = staffsService.updateStaff(staffsDTO, id);
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/get")
    public HttpEntity<?> get(){
        ApiResponse staffs = staffsService.getStaffs();
        return ResponseEntity.ok(staffs);
    }
    @GetMapping("/getStaffById/{id}")
    public HttpEntity<?> getId(@Validated @PathVariable UUID id){
        ApiResponse staffById = staffsService.getStaffById(id);
        return ResponseEntity.ok(staffById);
    }

    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> delete(@Validated @PathVariable UUID id){
        ApiResponse apiResponse = staffsService.deleteById(id);
        return ResponseEntity.ok(apiResponse);
    }
}
