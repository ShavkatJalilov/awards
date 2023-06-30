package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.IdentifiedMissing;
import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.IdentifyMissingDto;
import com.example.ppxprojextnew.Payload.IdentifyMissingUpdate;
import com.example.ppxprojextnew.Repositories.IdentifyMissingRepository;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Services.IdentifyMissingService;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.MinioException;
import lombok.SneakyThrows;
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
public class IdentifyServiceImpl implements IdentifyMissingService {

    @Autowired
    StaffsRepository staffsRepository;
    @Autowired
    IdentifyMissingRepository identifyMissingRepository;

    @Value("${minio.url}")
    private String miniUrl;

    @Value("${minio.accessKey}")
    private String minioAccessKey;

    @Value("${minio.secretKey}")
    private String minioSecretKey;

    @Value("${minio.bucket}")
    private String minioBucket;

    @SneakyThrows
    @Override
    public ApiResponse addIdentifyMissing(
            IdentifyMissingDto identifyMissingDto,
            UUID userid
    ) throws IOException {

//        boolean b = identifyMissingRepository.existsByFirstNameAndLastNameAndFamilyName(
//                identifyMissingDto.getFirstName(),
//                identifyMissingDto.getLastName(),
//                identifyMissingDto.getFamilyName());
        //hodimning barcha ma`lumotlarini ID si bo`yicha olib kelish
        Optional<Staffs> byId = staffsRepository.findById(userid);

        //hodimni mavjudligini tekshirish
        if (!byId.isPresent())
            return new ApiResponse("User Not found", false);

//        if (b)
//            return new ApiResponse("allReady added identifi missing",false);

        boolean upload;
        String newImagename="";
        String newFingerprintname="";
        try{
            String extension=this.getFileExtension(identifyMissingDto.getIdentifyMissingImages());
            String extension1=this.getFileExtension(identifyMissingDto.getIdentifyFingerPrint());
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
                            .stream(identifyMissingDto.getIdentifyMissingImages().getInputStream(), identifyMissingDto.getIdentifyMissingImages().getSize(),-1)
                            .contentType(identifyMissingDto.getIdentifyMissingImages().getContentType())
                            .build()
            );
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(newFingerprintname)
                            .stream(identifyMissingDto.getIdentifyFingerPrint().getInputStream(), identifyMissingDto.getIdentifyFingerPrint().getSize(), -1)
                            .contentType(identifyMissingDto.getIdentifyFingerPrint().getContentType())
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

        if(upload){

            //      aniqlangan bedarakni bazaga IdentifiedMissing jadvaliga saqlash

            IdentifiedMissing identifiedMissing=new IdentifiedMissing();
            identifiedMissing.setFirstName(identifyMissingDto.getFirstName());
            identifiedMissing.setLastName(identifyMissingDto.getLastName());
            identifiedMissing.setFamilyName(identifyMissingDto.getFamilyName());
            identifiedMissing.setPhoneNumber(identifyMissingDto.getPhoneNumber());
            identifiedMissing.setDateOfBirth(identifyMissingDto.getDateOfBirth());
            identifiedMissing.setTown(identifyMissingDto.getTown());
            identifiedMissing.setMaxalla(identifyMissingDto.getMaxalla());
            identifiedMissing.setLocation(identifyMissingDto.getLocation());
            identifiedMissing.setComment(identifyMissingDto.getComment());
            identifiedMissing.setStaffs(String.valueOf(byId.get().getId()));
            identifiedMissing.setIdentifyMissingImages(newImagename);
            identifiedMissing.setMissingFingerPrint(newFingerprintname);

            identifyMissingRepository.save(identifiedMissing);

            // hodimga ball berish Staffs jadvaliga ballik tizimda baholash va saqlash
            Staffs staffs=byId.get();
            String data = staffs.getDateScore();
            DateTimeFormatter dtf=DateTimeFormatter.ofPattern("dd-MM-yyyy");
            LocalDateTime now=LocalDateTime.now();
            LocalDate before=LocalDate.parse(data);

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
            return new ApiResponse("Add new identify missing!",true);
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
    public ApiResponse updateIdentifyMissing(Long id, IdentifyMissingUpdate identifyMissingDto) throws IOException {
        Optional<IdentifiedMissing> byId = identifyMissingRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not Found",false);

        boolean b = identifyMissingRepository.existsByIdNotAndFirstNameAndLastNameAndFamilyName(
                id,
                identifyMissingDto.getFirstName(),
                identifyMissingDto.getLastName(),
                identifyMissingDto.getFamilyName()
        );
        if (b) return new ApiResponse("allReady added identifi missing",false);
        IdentifiedMissing identifiedMissing=byId.get();
        identifiedMissing.setFirstName(identifyMissingDto.getFirstName());
        identifiedMissing.setLastName(identifyMissingDto.getLastName());
        identifiedMissing.setFamilyName(identifyMissingDto.getFamilyName());
        identifiedMissing.setPhoneNumber(identifyMissingDto.getPhoneNumber());
        identifiedMissing.setDateOfBirth(identifyMissingDto.getDateOfBirth());
        identifiedMissing.setTown(identifyMissingDto.getTown());
        identifiedMissing.setMaxalla(identifyMissingDto.getMaxalla());
        identifiedMissing.setLocation(identifyMissingDto.getLocation());
        identifiedMissing.setComment(identifyMissingDto.getComment());

        identifyMissingRepository.save(identifiedMissing);
        return new ApiResponse("Update identifyMissing!",true);
    }

    @Override
    public ApiResponse deleteIdentifyMissing(Long id) {
        boolean b = identifyMissingRepository.existsById(id);
        if (!b) return new ApiResponse("Not Found",false);
        identifyMissingRepository.deleteById(id);
        return new ApiResponse("deleted identify missing!",true);
    }

    @Override
    public ApiResponse getIdentifyMissing() {
        List<IdentifiedMissing> all = identifyMissingRepository.findAll();
        return new ApiResponse("Identify missings",true,all);
    }

    @Override
    public ApiResponse getIdIdentifyMissing(Long id) {
        Optional<IdentifiedMissing> byId = identifyMissingRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        return new ApiResponse("get id Identify missing",true,byId);
    }
    public void saveImageMissing(IdentifiedMissing identifiedMissing){
        identifyMissingRepository.save(identifiedMissing);
    }
    public List<IdentifiedMissing> getAllActiveImageMissing(){
        return identifyMissingRepository.findAll();
    }

}
