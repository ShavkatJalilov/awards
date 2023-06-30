package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.CheckedWeapons;
import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.CheckedWeaponsDTO;
import com.example.ppxprojextnew.Repositories.CheckedWeaponsRepository;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Services.CheckedWeaponsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CheckedWeaponsImpl implements CheckedWeaponsService {

    @Autowired
    CheckedWeaponsRepository checkedWeaponsRepository;
    @Autowired
    StaffsRepository staffsRepository;

    @Override
    public ApiResponse addWeapons(CheckedWeaponsDTO checkedWeaponsDTO, UUID userid) {
        Optional<Staffs> byId = staffsRepository.findById(userid);
        if (!byId.isPresent())
            return new ApiResponse("User Not found", false);

        boolean b = checkedWeaponsRepository.existsByGunBrandAndGunNumber(
                checkedWeaponsDTO.getGunBrand(),
                checkedWeaponsDTO.getGunNumber());
        if (b)
            return new ApiResponse("Allready added checked weapons", false);


        CheckedWeapons checkedWeapons1=new CheckedWeapons();
        checkedWeapons1.setFirstName(checkedWeaponsDTO.getFirstName());
        checkedWeapons1.setLastName(checkedWeaponsDTO.getLastName());
        checkedWeapons1.setFamilyName(checkedWeaponsDTO.getFamilyName());
        checkedWeapons1.setPhoneNumber(checkedWeaponsDTO.getPhoneNumber());
        checkedWeapons1.setGunBrand(checkedWeaponsDTO.getGunBrand());
        checkedWeapons1.setGunNumber(checkedWeaponsDTO.getGunNumber());
        checkedWeapons1.setComment(checkedWeaponsDTO.getComment());
        checkedWeapons1.setStaffs(String.valueOf(byId.get().getId()));

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

        checkedWeaponsRepository.save(checkedWeapons1);
        staffsRepository.save(staffs);
        return new ApiResponse("Checked Weapons successfully added", true);
    }

    @Override
    public ApiResponse update(Long id, CheckedWeaponsDTO checkedWeaponsDTO) {
        Optional<CheckedWeapons> byId = checkedWeaponsRepository.findById(id);
        boolean b = checkedWeaponsRepository.existsByIdNotAndGunBrandAndGunNumber(
                id,
                checkedWeaponsDTO.getGunBrand(),
                checkedWeaponsDTO.getGunNumber()
        );
        if (b) return new ApiResponse("already register gun",false);
        if (byId.isPresent()){
            CheckedWeapons checkedWeapons=byId.get();
            checkedWeapons.setFirstName(checkedWeaponsDTO.getFirstName());
            checkedWeapons.setLastName(checkedWeaponsDTO.getLastName());
            checkedWeapons.setFamilyName(checkedWeaponsDTO.getFamilyName());
            checkedWeapons.setPhoneNumber(checkedWeaponsDTO.getPhoneNumber());
            checkedWeapons.setGunBrand(checkedWeaponsDTO.getGunBrand());
            checkedWeapons.setGunNumber(checkedWeaponsDTO.getGunNumber());
            checkedWeapons.setComment(checkedWeaponsDTO.getComment());
            checkedWeaponsRepository.save(checkedWeapons);
            return new ApiResponse("Updated successfully", true);
        }
        return new ApiResponse("Not Found", false);
    }

    @Override
    public ApiResponse delete(Long id) {
        boolean b = checkedWeaponsRepository.existsById(id);
        if (!b) return new ApiResponse("Not found", false);
        checkedWeaponsRepository.deleteById(id);

        return new ApiResponse("Successfully deleted", true);
    }

    @Override
    public ApiResponse getWeapons() {
        List<CheckedWeapons> checkedWeapons = checkedWeaponsRepository.findAll();
        return new ApiResponse("Weapoons list", true, checkedWeapons);

    }

    @Override
    public ApiResponse getIdWeapons(Long id) {
        Optional<CheckedWeapons> byId = checkedWeaponsRepository.findById(id);

        return new ApiResponse("find by id",true,byId);
    }

}
