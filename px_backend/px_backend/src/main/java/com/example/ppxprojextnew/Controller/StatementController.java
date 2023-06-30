package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.StatementDto;
import com.example.ppxprojextnew.Payload.StatementUpdate;
import com.example.ppxprojextnew.Repositories.StatementRepository;
import com.example.ppxprojextnew.Services.StatementService;
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
@RequestMapping("/api/statement")
//bayonnoma
public class StatementController {
    @Autowired
    StatementRepository statementRepository;
    @Autowired
    StatementService statementService;

    @PostMapping("/add/{userid}")
    public @ResponseBody ResponseEntity<?> addStatement(@Validated  @ModelAttribute StatementDto statementDto, @PathVariable UUID userid) throws IOException {
        ApiResponse apiResponse = statementService.addStatement(statementDto, userid);
        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/update/{id}")
    public HttpEntity<?> updateStatement(@Validated @ModelAttribute StatementUpdate statementDto, @PathVariable Long id) throws IOException {
        ApiResponse apiResponse = statementService.updateStatement(id, statementDto);
        return ResponseEntity.ok(apiResponse);
    }
    @DeleteMapping("/delete/{id}")
    public HttpEntity<?> deleteStatement(@Validated @PathVariable Long id){
        ApiResponse apiResponse = statementService.deleteStatement(id);
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/get")
    public HttpEntity<?> getStatement(){
        ApiResponse apiResponse = statementService.getStatements();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/get/{id}")
    public HttpEntity<?> getStatementById(@Validated @PathVariable Long id){
        ApiResponse apiResponse = statementService.getIdStatement(id);
        return ResponseEntity.ok(apiResponse);
    }
}
