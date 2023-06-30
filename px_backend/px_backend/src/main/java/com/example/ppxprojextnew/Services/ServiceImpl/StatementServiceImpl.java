package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Model.Statement;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.StatementDto;
import com.example.ppxprojextnew.Payload.StatementUpdate;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Repositories.StatementRepository;
import com.example.ppxprojextnew.Services.StatementService;
import com.example.ppxprojextnew.Templates.Function;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.MinioException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
public class StatementServiceImpl implements StatementService {
    @Autowired
    StaffsRepository staffsRepository;
    @Autowired
    StatementRepository statementRepository;


    @Value("${minio.url}")
    private String minioUrl;

    @Value("${minio.accessKey}")
    private String minioAccessKey;

    @Value("${minio.secretKey}")
    private String minioSecretKey;

    @Value("${minio.bucket}")
    private String minioBucket;

    Function function;

    @Override
    public ApiResponse addStatement(StatementDto statementDto, UUID userid) throws IOException {
//        boolean b = statementRepository.existsByFirstNameAndLastNameAndFamilyName(
//                statementDto.getFirstName(),
//                statementDto.getLastName(),
//                statementDto.getFamilyName()
//        );
        // hodimni ID si bo`yicha ma`lumotlarini olib kelish
        Optional<Staffs> byId = staffsRepository.findById(userid);

        if (!byId.isPresent())
            return new ApiResponse("User Not found", false);

//        if (b)return new ApiResponse("Allready Add Statement",false);
        boolean upload;
        String newImagename="";
        String newFingerprintname="";
        try {
            String extension=this.getFileExtension(statementDto.getImageByte());
            String extension1=this.getFileExtension(statementDto.getFingerByte());
            long timestamp=System.currentTimeMillis()/10L;
            long timestamp1=System.currentTimeMillis();

            newImagename=timestamp+extension;
            newFingerprintname=timestamp1+extension1;

            MinioClient minioClient=
                    MinioClient.builder()
                            .endpoint(minioUrl)
                            .credentials(minioAccessKey, minioSecretKey)
                            .build();

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(newImagename)
                            .stream(statementDto.getImageByte().getInputStream(), statementDto.getImageByte().getSize(), -1)
                            .contentType(statementDto.getImageByte().getContentType())
                            .build()
            );
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(minioBucket)
                            .object(newFingerprintname)
                            .stream(statementDto.getFingerByte().getInputStream(), statementDto.getFingerByte().getSize(), -1)
                            .contentType(statementDto.getFingerByte().getContentType())
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
        // file saqlanganligini aniqlash agar saqlangan bo`lsa true aks holda false qaytaradi
        if (upload){
            Statement statement=new Statement();
            statement.setFirstName(statementDto.getFirstName());
            statement.setLastName(statementDto.getLastName());
            statement.setFamilyName(statementDto.getFamilyName());
            statement.setPhoneNumber(statementDto.getPhoneNumber());
            statement.setDateOfBirth(statementDto.getDateOfBirth());
            statement.setTown(statementDto.getTown());
            statement.setMaxalla(statementDto.getMaxalla());
            statement.setLocation(statementDto.getLocation());
            statement.setComment(statementDto.getComment());
            statement.setFromPlace(statementDto.getFromPlace());
            statement.setStatement(statementDto.getStaffComment());

            statement.setComment(statementDto.getStaffComment());
            statement.setStaffs(String.valueOf(byId.get().getId()));

            statement.setImage(newImagename);
            statement.setFingerprint(newFingerprintname);
            statementRepository.save(statement); // jadvalga saqlash

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
                }else if (data.equals(dtf.format(now))){
                    if (staffs.getScore()==0){
                        staffs.setScore(1);
                        staffs.setTodayScore(1);
                    }else {
                        staffs.setScore(staffs.getScore()+1);
                        staffs.setTodayScore(staffs.getTodayScore()+1);
                    }
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
            return new ApiResponse("added Statement",true);

        }
       return new ApiResponse("Error.", false);
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
    public ApiResponse updateStatement(Long id, StatementUpdate statementDto) throws IOException {
        boolean b = statementRepository.existsByIdNotAndFirstNameAndLastNameAndFamilyName(
                id,
                statementDto.getFirstName(),
                statementDto.getLastName(),
                statementDto.getFamilyName()
        );
        if (b)return new ApiResponse("Allready Add Statement",false);
        Optional<Statement> byId = statementRepository.findById(id);
        Statement statement=byId.get();
        statement.setCreatedTime(statement.getCreatedTime());
        statement.setFirstName(statementDto.getFirstName());
        statement.setLastName(statementDto.getLastName());
        statement.setFamilyName(statementDto.getFamilyName());
        statement.setPhoneNumber(statementDto.getPhoneNumber());
        statement.setDateOfBirth(statementDto.getDateOfBirth());
        statement.setTown(statementDto.getTown());
        statement.setMaxalla(statementDto.getMaxalla());
        statement.setLocation(statementDto.getLocation());
        statement.setComment(statementDto.getStaffComment());
        statement.setFromPlace(statementDto.getFromPlace());
        statement.setStatement(statementDto.getStaffComment());
        statementRepository.save(statement);

        return new ApiResponse("update Statement",true);
    }

    @Override
    public ApiResponse deleteStatement(Long id) {
              boolean b = statementRepository.existsById(id);
        if (!b) return new ApiResponse("Not Found", false);
        statementRepository.deleteById(id);

        return new ApiResponse("deleted statement", true);
    }

    @Override
    public ApiResponse getStatements() {
        List<Statement> all = statementRepository.findAll();
        return new ApiResponse("All Statements",true,all);
    }

    @Override
    public ApiResponse getIdStatement(Long id) {
        Optional<Statement> byId = statementRepository.findById(id);
        if (byId.isEmpty())return new ApiResponse("Not Found",false);
        return new ApiResponse("getId Statement",true,byId);
    }
    //2023-05-03 16:10

    @Override
    public ApiResponse getTime(String town,String maxalla,String day, String month, String year, String startT, String endT) throws ParseException {
        String d1=year+"-"+month+"-"+day+" "+startT;
        String d2=year+"-"+month+"-"+day+" "+endT;
        List<Statement> result = statementRepository.findAllByTownAndMaxallaAndCreatedTimeBetween(
                town,
                maxalla,
                function.createTime(d1),
                function.createTime(d2));

        return new ApiResponse("time",true,result);
    }

}
