package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.PROF_Persons;
import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.ProfPersonDto;
import com.example.ppxprojextnew.Repositories.Prof_persons_repository;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Services.ProfPersonService;
import com.example.ppxprojextnew.Templates.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PROF_Person_Impl implements ProfPersonService {
    @Autowired
    Prof_persons_repository prof_persons_repository;
    @Autowired
    StaffsRepository staffsRepository;

    @Override
    public ApiResponse addProfPerson(ProfPersonDto profPersonDto, UUID userid) {
        boolean b = prof_persons_repository.existsByFirstNameAndLastNameAndFamilyName(
                profPersonDto.getFirstName(),
                profPersonDto.getLastName(),
                profPersonDto.getFamilyName()
        );
        Optional<Staffs> byId = staffsRepository.findById(userid);
        if (!byId.isPresent()) return new ApiResponse("User not Found", false);
        if (b)return new ApiResponse("allready add persons",false);
        PROF_Persons persons=new PROF_Persons();
        persons.setFirstName(profPersonDto.getFirstName());
        persons.setLastName(profPersonDto.getLastName());
        persons.setFamilyName(profPersonDto.getFamilyName());
        persons.setPhoneNumber(profPersonDto.getPhoneNumber());
        persons.setDateOfBirth(profPersonDto.getDateOfBirth());
        persons.setPROFPersons(profPersonDto.getPROFPersons());
        persons.setTown(profPersonDto.getTown());
        persons.setMaxalla(profPersonDto.getMaxalla());
        persons.setLocation(profPersonDto.getLocation());
        persons.setComment(profPersonDto.getComment());
        persons.setStaffs(String.valueOf(byId.get().getId()));
        prof_persons_repository.save(persons);

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
        return new ApiResponse("Add persons",true);
    }

    @Override
    public ApiResponse updateProfPerson(Long id, ProfPersonDto profPersonDto) {
        Optional<PROF_Persons> byId = prof_persons_repository.findById(id);
        if (byId.isPresent()){
            boolean b = prof_persons_repository.existsByIdNotAndFirstNameAndLastNameAndFamilyName(
                    id,
                    profPersonDto.getFirstName(),
                    profPersonDto.getLastName(),
                    profPersonDto.getFamilyName()
            );
            if (b)return new ApiResponse("allready add persons",false);
            PROF_Persons persons=byId.get();
            persons.setFirstName(profPersonDto.getFirstName());
            persons.setLastName(profPersonDto.getLastName());
            persons.setFamilyName(profPersonDto.getFamilyName());
            persons.setPhoneNumber(profPersonDto.getPhoneNumber());
            persons.setDateOfBirth(profPersonDto.getDateOfBirth());
            persons.setPROFPersons(profPersonDto.getPROFPersons());
            persons.setTown(profPersonDto.getTown());
            persons.setMaxalla(profPersonDto.getMaxalla());
            persons.setLocation(profPersonDto.getLocation());
            persons.setComment(profPersonDto.getComment());
            prof_persons_repository.save(persons);
            return new ApiResponse("Updated persons",true);
        }
        return new ApiResponse("Not Found", false);
    }

    @Override
    public ApiResponse deleteProfPerson(Long id) {
        boolean b = prof_persons_repository.existsById(id);
        if (!b)return new ApiResponse("Not Found",false);
        prof_persons_repository.deleteById(id);
        return new ApiResponse("delete PROF_Person",true);
    }

    @Override
    public ApiResponse getProfPersons() {
        List<PROF_Persons> all = prof_persons_repository.findAll();
        return new ApiResponse("All PROF_Person",true,all);
    }

    @Override
    public ApiResponse getIdProfPerson(Long id) {
        Optional<PROF_Persons> byId = prof_persons_repository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not Found",false);
        return new ApiResponse("getByID PROF_Person",true,byId);
    }
}
