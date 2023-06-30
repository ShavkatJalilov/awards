package com.example.ppxprojextnew.Controller;

import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.IdentifyMissingDto;
import com.example.ppxprojextnew.Payload.IdentifyMissingUpdate;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;
import com.example.ppxprojextnew.Services.IdentifyMissingService;
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
@RequestMapping("/api/v1")
//ushlangan qidiruvdagilar
public class IdentifiedMissingController {
//    @Autowired
//    IdentifyMissingRepository missingRepository;
    @Autowired
    IdentifyMissingService missingService;
//
//    @Autowired
//    IdentifyMissingImagesRepository identifyMissingImagesRepository;
//    @Autowired
//    MissingFingerPrintRepository missingFingerPrintRepository;

    @PostMapping("/addIdentify/{userid}")
    public HttpEntity<?> addIdentify(@Validated @ModelAttribute IdentifyMissingDto identifyMissingDto, @PathVariable UUID userid) throws IOException {
        ApiResponse apiResponse=missingService.addIdentifyMissing(identifyMissingDto, userid);
        return ResponseEntity.ok(apiResponse);
    }
    @PutMapping("/updateIdentify/{id}")
    public HttpEntity<?> updateIdentify(@Validated @PathVariable Long id,@ModelAttribute IdentifyMissingUpdate identifyMissingDto) throws IOException {
        ApiResponse apiResponse=missingService.updateIdentifyMissing(id,identifyMissingDto);
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/getAllIdentify")
    public HttpEntity<?> getAllIdentify() throws IOException {
        ApiResponse apiResponse=missingService.getIdentifyMissing();
        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/deleteIdIdentify/{id}")
    public HttpEntity<?> deleteIdIdentify(@Validated @PathVariable Long id){
        ApiResponse apiResponse=missingService.deleteIdentifyMissing(id);
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/getIdIdentify/{id}")
    public HttpEntity<?> getIdIdentify(@Validated @PathVariable Long id) throws IOException{
        ApiResponse apiResponse=missingService.getIdIdentifyMissing(id);
        return ResponseEntity.ok(apiResponse);
    }

//    @GetMapping("/getAllMissingTime")
//    public HttpEntity<?> getAllMissingTime(@Validated @ModelAttribute TimeIntervalDto time) throws ParseException {
//        ApiResponse apiResponse=missingService.getTime(
//                time.getTown(),
//                time.getMaxalla(),
//                time.getDay(),
//                time.getMonth(),
//                time.getYear(),
//                time.getStartH(),
//                time.getEndH()
//        );
//        return ResponseEntity.ok(apiResponse);
//    }

}