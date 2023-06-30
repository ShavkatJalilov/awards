package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.Persons;
import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.PersonsDto;
import com.example.ppxprojextnew.Payload.PersonsUpdateDto;
import com.example.ppxprojextnew.Repositories.PersonsRepository;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Services.PersonsService;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.MinioException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PersonsImpl implements PersonsService {

    @Autowired
    PersonsRepository personsRepository;
    @Autowired
    StaffsRepository staffsRepository;

    @Value("${minio.url}")
    private String miniUrl;

    @Value("${minio.accessKey}")
    private String minioAccessKey;

    @Value("${minio.secretKey}")
    private String minioSecretKey;

    @Value("${minio.bucket}")
    private String minioBucket;

    // Persons jadvaliga saqlash
    @Override
    public ApiResponse addPersons(PersonsDto personsDto, UUID userid) throws IOException {
//        boolean b = personsRepository.existsByFirstNameAndLastNameAndFamilyName(
//                personsDto.getFirstName(),
//                personsDto.getLastName(),
//                personsDto.getFamilyName()
//        );
        // saqlayotgan hodimning ma`lumotlarini Staffs jadvalidan olib kelish
        Optional<Staffs> byId = staffsRepository.findById(userid);
        //hodim mavjudligini tekshirish
        if (byId.isEmpty())
            return new ApiResponse("User Not found", false);
//        if (b)
//            return new ApiResponse("allready add persons",false);
//
        boolean upload;
        String newImagename="";
        String newFingerprintname="";
        try{
            String extension=this.getFileExtension(personsDto.getPersonImage());
            String extension1=this.getFileExtension(personsDto.getPersonFinger());
            long timestamp=System.currentTimeMillis()/10L;
            long timestamp1=System.currentTimeMillis();

            newImagename=timestamp+extension;
            newFingerprintname=timestamp1+extension1;

            MinioClient minioClient=
                    MinioClient.builder()
                            .endpoint(miniUrl)
                            .credentials(minioAccessKey, minioSecretKey)
                            .build();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(newImagename)
                            .stream(personsDto.getPersonImage().getInputStream(), personsDto.getPersonImage().getSize(), -1)
                            .contentType(personsDto.getPersonImage().getContentType())
                            .build()
            );
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(newFingerprintname)
                            .stream(personsDto.getPersonFinger().getInputStream(), personsDto.getPersonFinger().getSize(), -1)
                            .contentType(personsDto.getPersonFinger().getContentType())
                            .build()
            );
            upload=true;

        }catch (MinioException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        // file joylanganini tekshirish true bo`lsa joylangan aks holda yo`q
        if (upload){
            // Ro`yhatga olish. Persons jadvaliga ma`lumotlarni saqlash

            Persons persons=new Persons();
            persons.setFirstName(personsDto.getFirstName());
            persons.setLastName(personsDto.getLastName());
            persons.setFamilyName(personsDto.getFamilyName());
            persons.setPhoneNumber(personsDto.getPhoneNumber());
            persons.setDateOfBirth(personsDto.getDateOfBirth());
            persons.setPlace(personsDto.getPlace());
            persons.setTown(personsDto.getTown());
            persons.setCause(personsDto.getCause());
            persons.setMaxalla(personsDto.getMaxalla());
            persons.setLocation(personsDto.getLocation());
            persons.setTown(personsDto.getTown());
            persons.setComment(personsDto.getComment());
            persons.setStaffs(String.valueOf(byId.get().getId()));
            persons.setPersonImage(newImagename);
            persons.setFingerPerson(newFingerprintname);
            // guvohlarni saqlash

            persons.setWitnessName(personsDto.getWitnessName());
            persons.setWitnessLast(personsDto.getWitnessLast());
            persons.setWitnessFamily(personsDto.getWitnessFamily());
            persons.setWitnessTel(personsDto.getWitnessTel());

            personsRepository.save(persons);

// hodimni barcha ma`lumotlarini ID si bo`yicha Staffs jadvalidan olib kelish
            Staffs staffs=byId.get();
            String data = staffs.getDateScore();
            DateTimeFormatter dtf=DateTimeFormatter.ofPattern("dd-MM-yyyy"); // vaqt formatini berish
            LocalDateTime now=LocalDateTime.now(); // joriy ya`ni hozirgi vaqtni olish
            LocalDate before=LocalDate.parse(data); // bazadagi string qiyatdagi sanani LocalDate farmatga o`tkazish

            // hodimni oxirgi marotaba bazaga saqlagan ma`lumotini sanasini null emasligini tekshirish

            if (data!=null){
                if (before.getMonthValue()!=now.getMonthValue()){
                    staffs.setDateScore(dtf.format(now));
                    staffs.setScore(1);
                    staffs.setTodayScore(1);
                } else if (data.equals(dtf.format(now))){
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
        return new ApiResponse("Error. Failed", false);
    }

    private String getFileExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        int lastIndexOf = name.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return name.substring(lastIndexOf);
    }

    @Override
    public ApiResponse updatePersons(Long id, PersonsUpdateDto personsDto) throws IOException {
        // Ro`yhatga olingan shaxsni ID si bo`yicha ma`lumotlarini Persons jadvalidan olib kelish
        Optional<Persons> byid = personsRepository.findById(id);
        // ma`lumot bor yo`qligini tekshirish bo`sh bo`lsa true aks holda false qaytaradi
        if (byid.isEmpty())
            return new ApiResponse("Not Found",false);
        personsRepository.existsByIdNotAndFirstNameAndLastNameAndFamilyName(
                id,
                personsDto.getFirstName(),
                personsDto.getLastName(),
                personsDto.getFamilyName()
        );

        Persons persons=byid.get();
        persons.setFirstName(personsDto.getFirstName());
        persons.setLastName(personsDto.getLastName());
        persons.setFamilyName(personsDto.getFamilyName());
        persons.setPhoneNumber(personsDto.getPhoneNumber());
        persons.setDateOfBirth(personsDto.getDateOfBirth());
        persons.setPlace(personsDto.getPlace());
        persons.setTown(personsDto.getTown());
        persons.setCause(personsDto.getCause());
        persons.setMaxalla(personsDto.getMaxalla());
        persons.setLocation(personsDto.getLocation());
        persons.setComment(personsDto.getComment());
        if (personsDto.getWitnessLast()==null
                && personsDto.getWitnessName()==null
                && personsDto.getWitnessFamily()==null
                && personsDto.getWitnessTel()==null)
        {
            persons.setWitnessName("Guvohlar yo`q");
            persons.setWitnessLast("Guvohlar yo`q");
            persons.setWitnessFamily("Guvohlar yo`q");
            persons.setWitnessTel("Guvohlar yo`q");

        } else {
            persons.setWitnessName(personsDto.getWitnessName());
            persons.setWitnessLast(personsDto.getWitnessLast());
            persons.setWitnessFamily(personsDto.getWitnessFamily());
            persons.setWitnessTel(personsDto.getWitnessTel());
        }

        personsRepository.save(persons);
        return new ApiResponse("Update persons",true);
    }


    @Override
    public ApiResponse deletePersons(Long id) {
        boolean b = personsRepository.existsById(id);
        if (!b)
            return new ApiResponse("Not Found",false);
        personsRepository.deleteById(id);
        return new ApiResponse("Deleted person",true);
    }

    @Override
    public ApiResponse getPersons() {
        List<Persons> all = personsRepository.findAll();
        return new ApiResponse("All persons",true,all);
    }

    @Override
    public ApiResponse getIdPersons(Long id) {
        Optional<Persons> byId = personsRepository.findById(id);
        if (!byId.isPresent())return new ApiResponse("Not Found",false);
        return new ApiResponse("getid person",true,byId);
    }
}
