package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;
import com.example.ppxprojextnew.Services.SelectServices;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class SelectController {
    @Autowired
    SelectServices selectServices;


    //arxiv
    @GetMapping("/archive/{id}/{from}/{to}")
    public ResponseEntity<?> getarchive(@Validated @PathVariable Long id, @PathVariable String from, @PathVariable String to){
        ApiResponse archive = selectServices.getArchive(id, from, to);
        return ResponseEntity.ok(archive);
    }

    @PostMapping("/getCatchTime/{id}")
    public ResponseEntity<?> getCatchTime(@Validated @RequestBody TimeIntervalDto timeIntervalDto, @PathVariable Long id) throws ParseException {
        ApiResponse apiResponse=selectServices.getTime(timeIntervalDto, id);
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/getPersonScore/{userid}/{id}")
    public ResponseEntity<?> getscore(@Validated @PathVariable UUID userid,@PathVariable Long id){
        ApiResponse staffScore = selectServices.getStaffScore(userid, id);
        System.out.println(staffScore.getObject());
        return ResponseEntity.ok(staffScore);
    }
    @GetMapping("/getStaffScore/{userId}/{id}")
    public ResponseEntity<?> getStaffScore(@Validated @PathVariable UUID userId, @PathVariable Long id){
        ApiResponse staffsScaore = selectServices.getStaffScore(userId, id);
        return ResponseEntity.ok(staffsScaore);
    }

//    @GetMapping("/downloadImage/{val}/{id}")
//    public void download_file(@PathVariable Long val, @PathVariable Long id, HttpServletResponse response) throws IOException {
//        selectServices.downloadImage(val, id, response);
//
//    }
//    @GetMapping("/downloadFinger/{val}/{id}")
//    public void download_finger(@PathVariable Long val,@PathVariable Long id, HttpServletResponse response) throws IOException {
//       selectServices.downloadFingerPrint(val,id, response);
//    }
}
