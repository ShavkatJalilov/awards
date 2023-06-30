package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.GuardsObjects;
import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.GuardsDto;
import com.example.ppxprojextnew.Payload.StatementDto;
import com.example.ppxprojextnew.Repositories.GuardsRepository;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Repositories.StatementRepository;
import com.example.ppxprojextnew.Services.GuardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GuardsServiceImpl implements GuardsService {
    @Autowired
    GuardsRepository guardsRepository;
    @Autowired
    StaffsRepository staffsRepository;

    @Override
    public ApiResponse addGuards(GuardsDto guardsDto, UUID userid) throws IOException {
        boolean byFirstNameAndLastNameAndFamilyName = guardsRepository.existsByFirstNameAndLastNameAndFamilyName(
                guardsDto.getFirstName(),
                guardsDto.getLastName(),
                guardsDto.getFamilyName()
        );
        Optional<Staffs> byId = staffsRepository.findById(userid);
        if (!byId.isPresent()) return new ApiResponse("User Not found", false);
        if (byFirstNameAndLastNameAndFamilyName) return new ApiResponse("Already",false);
        GuardsObjects guardsObjects=new GuardsObjects();
        guardsObjects.setFirstName(guardsDto.getFirstName());
        guardsObjects.setLastName(guardsDto.getLastName());
        guardsObjects.setFamilyName(guardsDto.getFamilyName());
        guardsObjects.setPhoneNumber(guardsDto.getPhoneNumber());
        guardsObjects.setTown(guardsDto.getTown());
        guardsObjects.setMaxalla(guardsDto.getMaxalla());
        guardsObjects.setLocation(guardsDto.getLocation());
        guardsObjects.setComment(guardsDto.getComment());
        guardsObjects.setStaffs(String.valueOf(byId.get().getId()));
        guardsRepository.save(guardsObjects);

        Staffs staffs=byId.get();
        String data = staffs.getDateScore();
        DateTimeFormatter dtf=DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDateTime now=LocalDateTime.now();
        LocalDate before=LocalDate.parse(data);

        if (data!=null){
            if (before.getMonthValue()!=now.getMonthValue()){
                staffs.setDateScore(dtf.format(now));
                staffs.setScore(1);
                staffs.setTodayScore(1);
            }
            else if (data.equals(dtf.format(now))){
                if (staffs.getScore()==0){
                    staffs.setScore(1);
                    staffs.setTodayScore(1);
                }
                staffs.setScore(staffs.getScore()+1);
                staffs.setTodayScore(staffs.getTodayScore()+1);
            }
            else {
                staffs.setDateScore(dtf.format(now));
                staffs.setScore(staffs.getScore()+1);
                staffs.setTodayScore(1);
            }
        }
        else {
            staffs.setDateScore(dtf.format(now));
            staffs.setScore(1);
            staffs.setTodayScore(1);
        }
        staffsRepository.save(staffs);
        return new ApiResponse("Save",true);
    }

    @Override
    public ApiResponse updateGuards(Long id, GuardsDto guardsDto) throws IOException {
        Optional<GuardsObjects> byId = guardsRepository.findById(id);
        boolean byFirstNameAndLastNameAndFamilyName = guardsRepository.existsByFirstNameAndLastNameAndFamilyName(
                guardsDto.getFirstName(),
                guardsDto.getLastName(),
                guardsDto.getFamilyName()
        );
        if (byFirstNameAndLastNameAndFamilyName) return new ApiResponse("Already",false);
        GuardsObjects guardsObjects=byId.get();
        guardsObjects.setFirstName(guardsDto.getFirstName());
        guardsObjects.setLastName(guardsDto.getLastName());
        guardsObjects.setFamilyName(guardsDto.getFamilyName());
        guardsObjects.setPhoneNumber(guardsDto.getPhoneNumber());
        guardsObjects.setTown(guardsDto.getTown());
        guardsObjects.setMaxalla(guardsDto.getMaxalla());
        guardsObjects.setLocation(guardsDto.getLocation());
        guardsObjects.setComment(guardsDto.getComment());
        guardsRepository.save(guardsObjects);

        return new ApiResponse("Successfully updated", true);
    }

    @Override
    public ApiResponse deleteGuards(Long id) {
        Optional<GuardsObjects> byId = guardsRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not Found ", false);
        return new ApiResponse("deleted successfully", true);
    }

    @Override
    public ApiResponse getGuards() {
        List<GuardsObjects> all = guardsRepository.findAll();
        if (!all.isEmpty()) return new ApiResponse("Not Found", false);
        return new ApiResponse("Succes", true, all);
    }

    @Override
    public ApiResponse getIdGuards(Long id) {
        Optional<GuardsObjects> byId = guardsRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not Found", false);
        return new ApiResponse("Succes", true, byId);
    }

}
