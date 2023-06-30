package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.*;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;
import com.example.ppxprojextnew.Repositories.*;
import com.example.ppxprojextnew.Services.SelectServices;
import com.example.ppxprojextnew.Templates.Function;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class SelectServiceImpl implements SelectServices {


    @Autowired
    PersonsRepository personsRepository;
    @Autowired
    StatementRepository statementRepository;
    @Autowired
    IdentifyMissingRepository identifyMissingRepository;
    @Autowired
    GuardsRepository guardsRepository;
    @Autowired
    CheckedWeaponsRepository checkedWeaponsRepository;
    @Autowired
    Prof_persons_repository PROFpersonsRepository;
    @Autowired
    CatchWantedRepository catchWantedRepository;
    @Autowired
    StaffsRepository staffsRepository;

    public Timestamp createTime(String time){
        String stringDate = time;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date parsedDate = null;
        try {
            parsedDate = dateFormat.parse(stringDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
        return timestamp;
    }

    @Override
    public ApiResponse getStaffScore(UUID userid, Long id) {
        Optional<Staffs> byId = staffsRepository.findById(userid);
        if (!byId.isPresent()) return new ApiResponse("User Not Found", false);
        switch (id.toString()){
            case "1":
                List<Persons> allByStaffs = personsRepository.findAllByStaffs(byId.get().getId().toString());

                if (allByStaffs.isEmpty())
                    return new ApiResponse("Not found", false);

//                List<Map<String, String>> personsList=new ArrayList<>();
//
//                for (int i=0; i<allByStaffs.size(); i++){
//                    personsList.add(new HashMap<>());
//                    personsList.get(i).put("id",  allByStaffs.get(i).getId().toString());
//                    personsList.get(i).put("firstName",  allByStaffs.get(i).getFirstName());
//                    personsList.get(i).put("lastName",  allByStaffs.get(i).getLastName());
//                    personsList.get(i).put("familyName", allByStaffs.get(i).getFamilyName());
//                    personsList.get(i).put("phoneNumber", allByStaffs.get(i).getPhoneNumber());
//                    personsList.get(i).put("dateOfBirth", allByStaffs.get(i).getDateOfBirth());
//                    personsList.get(i).put("place", allByStaffs.get(i).getPlace());
//                    personsList.get(i).put("cause", allByStaffs.get(i).getCause());
//                    personsList.get(i).put("town", allByStaffs.get(i).getTown());
//                    personsList.get(i).put("maxalla", allByStaffs.get(i).getMaxalla());
//                    personsList.get(i).put("location", allByStaffs.get(i).getLocation());
//                    personsList.get(i).put("comment", allByStaffs.get(i).getComment());
//                    personsList.get(i).put("witnessName", allByStaffs.get(i).getWitnessName());
//                    personsList.get(i).put("witnessLast", allByStaffs.get(i).getWitnessLast());
//                    personsList.get(i).put("witnessFamily", allByStaffs.get(i).getWitnessFamily());
//                    personsList.get(i).put("witnessTel", allByStaffs.get(i).getWitnessTel());
//                }
                return new ApiResponse("time",true,allByStaffs);

            case "2":
                List<Statement> byStaffs1 = statementRepository.findAllByStaffs(byId.get().getId().toString());
                if (byStaffs1.isEmpty())
                    return new ApiResponse("Not found", false);

//                List<Map<String, String>> statementsList=new ArrayList<>();
//
//                for (int i=0; i<byStaffs1.size(); i++){
//                    statementsList.add(new HashMap<>());
//                    statementsList.get(i).put("id",  byStaffs1.get(i).getId().toString());
//                    statementsList.get(i).put("firstName",  byStaffs1.get(i).getFirstName());
//                    statementsList.get(i).put("lastName",  byStaffs1.get(i).getLastName());
//                    statementsList.get(i).put("familyName", byStaffs1.get(i).getFamilyName());
//                    statementsList.get(i).put("phoneNumber", byStaffs1.get(i).getPhoneNumber());
//                    statementsList.get(i).put("dateOfBirth", byStaffs1.get(i).getDateOfBirth());
//                    statementsList.get(i).put("town", byStaffs1.get(i).getTown());
//                    statementsList.get(i).put("maxalla", byStaffs1.get(i).getMaxalla());
//                    statementsList.get(i).put("location", byStaffs1.get(i).getLocation());
//                    statementsList.get(i).put("comment", byStaffs1.get(i).getComment());
//                    statementsList.get(i).put("fromPlace", byStaffs1.get(i).getFromPlace());
//                    statementsList.get(i).put("statement", byStaffs1.get(i).getStatement());
//                    // statementsList.get(i).put("staffComment", allByTownAndMaxallaAndCreatedTimeBetween2.get(i).getWitnessFamily());
//                }

                return new ApiResponse("time",true,byStaffs1);
            case "3":
                List<PROF_Persons> byStaffs2 = PROFpersonsRepository.findAllByStaffs(byId.get().getId().toString());
                if (byStaffs2.isEmpty()) return new ApiResponse("Not found", false);

                return new ApiResponse("time",true, byStaffs2);
            case "4":
                List<CatchWanted> byStaffs3 = catchWantedRepository.findAllByStaffs(byId.get().getId().toString());

                if (byStaffs3.isEmpty())
                    return new ApiResponse("Not found", false);
//                List<Map<String, String>> сatchWantedList=new ArrayList<>();
//
//                for (int i=0; i<byStaffs3.size(); i++){
//                    сatchWantedList.add(new HashMap<>());
//                    сatchWantedList.get(i).put("id",  byStaffs3.get(i).getId().toString());
//                    сatchWantedList.get(i).put("firstName",  byStaffs3.get(i).getFirstName());
//                    сatchWantedList.get(i).put("lastName",  byStaffs3.get(i).getLastName());
//                    сatchWantedList.get(i).put("familyName", byStaffs3.get(i).getFamilyName());
//                    сatchWantedList.get(i).put("phoneNumber", byStaffs3.get(i).getPhoneNumber());
//                    сatchWantedList.get(i).put("town", byStaffs3.get(i).getTown());
//                    сatchWantedList.get(i).put("maxalla", byStaffs3.get(i).getMaxalla());
//                    сatchWantedList.get(i).put("location", byStaffs3.get(i).getLocation());
//                    сatchWantedList.get(i).put("comment", byStaffs3.get(i).getComment());
//                }
                return new ApiResponse("list4", true, byStaffs3);

            case "5":
                List<IdentifiedMissing> byStaffs4 = identifyMissingRepository.findAllByStaffs(byId.get().getId().toString());
                if (byStaffs4.isEmpty())
                    return new ApiResponse("Not found", false);

//                List<Map<String, String>> identifyList=new ArrayList<>();
//
//                for (int i=0; i<byStaffs4.size(); i++){
//                    identifyList.add(new HashMap<>());
//                    identifyList.get(i).put("id",  byStaffs4.get(i).getId().toString());
//                    identifyList.get(i).put("firstName",  byStaffs4.get(i).getFirstName());
//                    identifyList.get(i).put("lastName",  byStaffs4.get(i).getLastName());
//                    identifyList.get(i).put("familyName", byStaffs4.get(i).getFamilyName());
//                    identifyList.get(i).put("phoneNumber", byStaffs4.get(i).getPhoneNumber());
//                    identifyList.get(i).put("dateOfBirth", byStaffs4.get(i).getDateOfBirth());
//                    identifyList.get(i).put("town", byStaffs4.get(i).getTown());
//                    identifyList.get(i).put("maxalla", byStaffs4.get(i).getMaxalla());
//                    identifyList.get(i).put("location", byStaffs4.get(i).getLocation());
//                    identifyList.get(i).put("comment", byStaffs4.get(i).getComment());
//                }
                return new ApiResponse("time",true,byStaffs4);

            case "6":
                List<GuardsObjects> allByStaffs1 = guardsRepository.findAllByStaffs(byId.get().getId().toString());
                if (allByStaffs1.isEmpty())
                    return new ApiResponse("Not found", false);

                return new ApiResponse("list6", true, allByStaffs1);

            case "7":
                List<CheckedWeapons> byStaffs6 = checkedWeaponsRepository.findAllByStaffs(byId.get().toString());
                if (byStaffs6.isEmpty()) return new ApiResponse("Not found", false);
                return new ApiResponse("list7", true, byStaffs6);
        }
        return new ApiResponse("Not found", false);
    }



    @Override
    public ApiResponse getTime(TimeIntervalDto timeIntervalDto, Long id) throws ParseException {
        String d1=timeIntervalDto.getYear()+"-"+timeIntervalDto.getMonth()+"-"+timeIntervalDto.getDay()+" "+timeIntervalDto.getStartH();
        String d2= timeIntervalDto.getYear()+"-"+timeIntervalDto.getMonth()+"-"+timeIntervalDto.getDay()+" "+timeIntervalDto.getEndH();
        System.out.println(d1+" "+d2);


        switch (id.toString()){
            case "1":
                List<Persons> list1 = personsRepository.findAllByTownAndMaxallaAndCreatedTimeBetween(
                        timeIntervalDto.getTown(),
                        timeIntervalDto.getMaxalla(),
                        createTime(d1),
                        createTime(d2));
//
                return new ApiResponse("time",true,list1);

            case "2":
                List<Statement> list2 = statementRepository.findAllByTownAndMaxallaAndCreatedTimeBetween(
                        timeIntervalDto.getTown(),
                        timeIntervalDto.getMaxalla(),
                        createTime(d1),
                        createTime(d2));

                return new ApiResponse("time",true,list2);

            case "3":
                List<PROF_Persons> list3 = PROFpersonsRepository.findAllByTownAndMaxallaAndCreatedTimeBetween(
                        timeIntervalDto.getTown(),
                        timeIntervalDto.getMaxalla(),
                        createTime(d1),
                        createTime(d2));
                return new ApiResponse("time",true,list3);

            case "4":
                List<CatchWanted> list4 = catchWantedRepository.findAllByTownAndMaxallaAndCreatedTimeBetween(
                        timeIntervalDto.getTown(),
                        timeIntervalDto.getMaxalla(),
                        createTime(d1),
                        createTime(d2)
                );


                return new ApiResponse("time",true,list4);

            case "5":
                List<IdentifiedMissing> list5 = identifyMissingRepository.findAllByTownAndMaxallaAndCreatedTimeBetween(
                        timeIntervalDto.getTown(),
                        timeIntervalDto.getMaxalla(),
                        createTime(d1),
                        createTime(d2)
                );

                return new ApiResponse("time",true,list5);

            case "6":
                List<GuardsObjects> list6 = guardsRepository.findAllByTownAndMaxallaAndCreatedTimeBetween(
                        timeIntervalDto.getTown(),
                        timeIntervalDto.getMaxalla(),
                        createTime(d1),
                        createTime(d2)
                );
                return new ApiResponse("time",true,list6);

            case "7":

                List<CheckedWeapons> byCreatedTimeBetween = checkedWeaponsRepository.findByCreatedTimeBetween(
                        createTime(d1),
                        createTime(d2)
                );
                return new ApiResponse("time",true, byCreatedTimeBetween);

            case "":
                return new ApiResponse("time",false);
        }
        return new ApiResponse("time",false);
    }

    //good
    @Override
    public ApiResponse getArchive(Long id, String from, String to) {
        String d1=from+" "+"00:00";
        String d2=to+" "+"23:59";
        switch (id.toString()){
            case "1":
                List<Persons> allByCreatedTimeBetween = personsRepository.findAllByCreatedTimeBetween(
                        createTime(d1),
                        createTime(d2));

                if (allByCreatedTimeBetween.isEmpty())
                    return new ApiResponse(
                            "Not Found",
                            false);

                return new ApiResponse(
                        "Success",
                        true,
                        allByCreatedTimeBetween);
            case "2":
                List<Statement> allByCreatedTimeBetween1 = statementRepository.findAllByCreatedTimeBetween(
                        createTime(d1),
                        createTime(d2));

                if (allByCreatedTimeBetween1.isEmpty())
                    return new ApiResponse(
                            "Not Found",
                            false);

                return new ApiResponse(
                        "Success",
                        true,
                        allByCreatedTimeBetween1);
            case "3":
                List<PROF_Persons> allByCreatedTimeBetween2 = PROFpersonsRepository.findAllByCreatedTimeBetween(
                        createTime(d1),
                        createTime(d2));

                if (allByCreatedTimeBetween2.isEmpty())
                    return new ApiResponse("Not Found", false);

                return new ApiResponse(
                        "Success",
                        true,
                        allByCreatedTimeBetween2);
            case "4":
                List<CatchWanted> allByCreatedTimeBetween3 = catchWantedRepository.findAllByCreatedTimeBetween(
                        createTime(d1),
                        createTime(d2));

                if (allByCreatedTimeBetween3.isEmpty())
                    return new ApiResponse("Not Found", false);


                return new ApiResponse(
                        "success",
                        true,
                        allByCreatedTimeBetween3);

            case "5":
                List<IdentifiedMissing> allByCreatedTimeBetween4 = identifyMissingRepository.findAllByCreatedTimeBetween(
                        createTime(d1),
                        createTime(d2));

                if(allByCreatedTimeBetween4.isEmpty())
                    return new ApiResponse("Not Found", false);

                return new ApiResponse(
                        "success",
                        true,
                        allByCreatedTimeBetween4);

            case "6":
                List<GuardsObjects> allByCreatedTimeBetween5 = guardsRepository.findAllByCreatedTimeBetween(
                        createTime(d1),
                        createTime(d2));

                if (allByCreatedTimeBetween5.isEmpty())
                    return new ApiResponse("Not Found", false);

                return new ApiResponse(
                        "Success",
                        true,
                        allByCreatedTimeBetween5);
            case "7":
                List<CheckedWeapons> allByCreatedTimeBetween6 = checkedWeaponsRepository.findAllByCreatedTimeBetween(
                        createTime(d1),
                        createTime(d2));

                if (allByCreatedTimeBetween6.isEmpty())
                    return new ApiResponse("Not Found", false);

                return new ApiResponse(
                        "Success",
                        true,
                        allByCreatedTimeBetween6);
        }
        return new ApiResponse("Not Found", false);
    }


}
