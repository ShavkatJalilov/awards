package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.*;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.CatchWantedDTO;
import com.example.ppxprojextnew.Payload.CatchWantedUpdate;
import com.example.ppxprojextnew.Payload.TimeIntervalDto;
import com.example.ppxprojextnew.Repositories.*;
import com.example.ppxprojextnew.Services.CatchWantedService;
import com.example.ppxprojextnew.Templates.Function;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.MinioException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CatchWantedImpl implements CatchWantedService {

    @Autowired
    StaffsRepository staffsRepository;
    @Autowired
    CatchWantedRepository catchWantedRepository;

    Function function;

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
    public ApiResponse addCatchWanteds(
            CatchWantedDTO catchWantedDTO,
            UUID userid
    ) throws IOException {
//        hodimni  id si bo`yicha Staffs jadvalidan ma`lumotlarini olib kelish

        Optional<Staffs> staffs1 = staffsRepository.findById(userid);
// hodim mavjudligini tekshirish sharti

        if (!staffs1.isPresent())
            return new ApiResponse("Not found", false);
// ushbu jadvalda
//        if (
//            catchWantedRepository.existsByFirstNameAndLastNameAndFamilyName(
//                catchWantedDTO.getFirstName(),
//                catchWantedDTO.getLastName(),
//                catchWantedDTO.getFamilyName()
//            )
//        ) {
//            return new ApiResponse("Allready Catch wanted users", false);
//        }
        boolean upload;
        String newImagename="";
        String newFingerprintname="";

        try{
            String extension=this.getFileExtension(catchWantedDTO.getCathWantedImages());
            String extension1=this.getFileExtension(catchWantedDTO.getWantedFingerPrint());
            long timestamp=System.currentTimeMillis()/10L;
            long timestamp1=System.currentTimeMillis();

            newImagename=timestamp+extension;
            newFingerprintname=timestamp1+extension1;

            MinioClient minioClient=
                    MinioClient.builder()
                            .endpoint(miniUrl)
                            .credentials(minioAccessKey, minioSecretKey)
                            .build();
            System.out.println(System.currentTimeMillis());
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(newImagename)
                            .stream(catchWantedDTO.getCathWantedImages().getInputStream(), catchWantedDTO.getCathWantedImages().getSize(), -1 )
                            .contentType(catchWantedDTO.getCathWantedImages().getContentType())
                            .build());

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(newFingerprintname)
                            .stream(catchWantedDTO.getWantedFingerPrint().getInputStream(), catchWantedDTO.getWantedFingerPrint().getSize(), -1 )
                            .contentType(catchWantedDTO.getWantedFingerPrint().getContentType())
                            .build());
            upload=true;
        }catch (MinioException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        if (upload){
            CatchWanted catchWanted=new CatchWanted();

            catchWanted.setFirstName(catchWantedDTO.getFirstName());
            catchWanted.setLastName(catchWantedDTO.getLastName());
            catchWanted.setFamilyName(catchWantedDTO.getFamilyName());
            catchWanted.setPhoneNumber(catchWantedDTO.getPhoneNumber());
            catchWanted.setTown(catchWantedDTO.getTown());
            catchWanted.setMaxalla(catchWantedDTO.getMaxalla());
            catchWanted.setLocation(catchWantedDTO.getLocation());
            catchWanted.setComment(catchWantedDTO.getComment());
            catchWanted.setStaffs(String.valueOf(staffs1.get().getId()));
            catchWanted.setCathWantedImages(newImagename);
            catchWanted.setWantedFingerPrint(newFingerprintname);

            Optional<Staffs> byId = staffsRepository.findById(userid);

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
                } else {
                    staffs.setDateScore(dtf.format(now));
                    staffs.setScore(staffs.getScore()+1);
                    staffs.setTodayScore(1);
                }
            } else {
                staffs.setDateScore(dtf.format(now));
                staffs.setScore(1);
                staffs.setTodayScore(1);
            }

            staffsRepository.save(staffs);

            return new ApiResponse("Successfully added", true);
        }
        return new ApiResponse("error", false);
    }

    private String getFileExtension(MultipartFile file) {
        String name = file.getOriginalFilename();
        int lastIndexOf = name.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return name.substring(lastIndexOf);
    }

    public void saveImage(CatchWanted catchWanted){
        catchWantedRepository.save(catchWanted);
    }

    public List<CatchWanted> getAllActiveImages(){
        return catchWantedRepository.findAll();
    }

    @Override
    public ApiResponse deleteByID(Long id) {
        if(!catchWantedRepository.existsById(id))
            return new ApiResponse("Not Found", false);

        catchWantedRepository.deleteById(id);

        return new ApiResponse("Successfully deleted", true);
    }

    @Override
    public ApiResponse updateCatchWanteds(Long id, CatchWantedUpdate catchWantedDTO) throws IOException {

        if (
            catchWantedRepository.existsByIdNotAndFirstNameAndLastNameAndFamilyName(
                id,
                catchWantedDTO.getFirstName(),
                catchWantedDTO.getLastName(),
                catchWantedDTO.getFamilyName()
            )
        ) {
            return new ApiResponse("Allready catch Wanted Persons", false);
        }

        Optional<CatchWanted> byId = catchWantedRepository.findById(id);

        if (byId.isPresent()){
            if (
                catchWantedRepository.existsByFirstNameAndLastNameAndFamilyName(
                    catchWantedDTO.getFirstName(),
                    catchWantedDTO.getLastName(),
                    catchWantedDTO.getFamilyName()
                )
            ) {
                return new ApiResponse("Allready catch Wanted Persons", false);
            }

            CatchWanted catchWanted=byId.get();
            catchWanted.setFirstName(catchWantedDTO.getFirstName());
            catchWanted.setLastName(catchWantedDTO.getLastName());
            catchWanted.setFamilyName(catchWantedDTO.getFamilyName());
            catchWanted.setPhoneNumber(catchWantedDTO.getPhoneNumber());
            catchWanted.setTown(catchWantedDTO.getTown());
            catchWanted.setMaxalla(catchWantedDTO.getMaxalla());
            catchWanted.setLocation(catchWantedDTO.getLocation());
            catchWanted.setComment(catchWantedDTO.getComment());
//
//            CatchWantedImages catchWantedImages=byId.get().getCathWantedImages();
//            catchWantedImages.setImage(catchWantedDTO.getCathWantedImages().getBytes());
//            catchWantedImages.setContentType(catchWantedDTO.getComment());
//            CatchWantedImages save = catchWantedImageRepository.save(catchWantedImages);
//            catchWanted.setCathWantedImages(save);
//
//
//            WantedFingerPrint wantedFingerPrint=byId.get().getWantedFingerPrint();
//            wantedFingerPrint.setFingerPrint(catchWantedDTO.getWantedFingerPrint().getBytes());
//            wantedFingerPrint.setContentType(catchWantedDTO.getWantedFingerPrint().getContentType());
//            WantedFingerPrint wantedFingerPrint1 = wantedFingerPrintRepository.save(wantedFingerPrint);
//            catchWanted.setWantedFingerPrint(wantedFingerPrint1);
            saveImage(catchWanted);

            return new ApiResponse("Successfully updated", true);
        }

        return new ApiResponse("Not Found", false);
    }

    @Override
    public ApiResponse getAllCatchs() {
        return new ApiResponse("Catch Wanted List", true, catchWantedRepository.findAll());
    }

    @Override
    public ApiResponse getIdCatchWanteds(Long id) {
        Optional<CatchWanted> byId = catchWantedRepository.findById(id);

        if (!byId.isPresent())
            return new ApiResponse("Not Found", false);

        return new ApiResponse("getById",true, byId);
    }
}
