package com.example.ppxprojextnew.Services.ServiceImpl;

import com.example.ppxprojextnew.Model.Role;
import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.JwtResponse;
import com.example.ppxprojextnew.Payload.LoginDto;
import com.example.ppxprojextnew.Payload.StaffsDTO;
import com.example.ppxprojextnew.Repositories.RoleRepository;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Security.TokenGenerator;
import com.example.ppxprojextnew.Services.StaffsService;
import com.example.ppxprojextnew.Templates.SystemRoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StaffServiceImpl implements StaffsService {

    @Autowired
    StaffsRepository staffsRepository;

    @Autowired
    TokenGenerator tokenGenerator;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    RoleRepository roleRepository;

    // Hodim qo`shish
    @Override
    public ApiResponse creatStaff(StaffsDTO staffsDTO) {
        Optional<Role> byId = roleRepository.findById(1L);

        Optional<Staffs> byUsername = staffsRepository.findByUsername(staffsDTO.getUserName());
        //username ni bazada mavjudligini tekshirish
        if (byUsername.isEmpty())
            return new ApiResponse("Allready staff", false);
        //Role ni bazada mavjudligini tekshirish
        if (byId.isEmpty())
            return new ApiResponse("Not Found role", false);

        Staffs staffs = new Staffs();
        staffs.setName(staffsDTO.getName());
        staffs.setLastName(staffsDTO.getLastName());
        staffs.setUsername(staffsDTO.getUserName());
        staffs.setSystemRoleName(SystemRoleName.USER);
        staffs.setRole(byId.get());
        staffs.setScore(0);
        staffs.setTodayScore(0);
        staffs.setPassword(passwordEncoder.encode(staffsDTO.getPassword()));

        staffsRepository.save(staffs);

        return new ApiResponse("Successfully created", true);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return (UserDetails) staffsRepository.findByUsername(username).orElseThrow(
                ()->new UsernameNotFoundException(username+" not found username")
        );
    }

    @Override
    public JwtResponse loginUser(LoginDto loginDTO) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsername(),
                        loginDTO.getPassword()
                )
        );

//        Optional<Staffs> byUsername = staffsRepository.findByUsername(loginDTO.getUsername());

        if (!authenticate.isAuthenticated()) return null;

        Staffs users= (Staffs) authenticate.getPrincipal();
//        String token1=;

        return new JwtResponse(
                tokenGenerator.generateJwtToken(
                        authenticate,
                        users.getSystemRoleName()
                ),
                users.getId(),
                users.getUsername(),
                users.getSystemRoleName().name(),
                users.getName(),
                users.getLastName()
        );
    }

    @Override
    public ApiResponse getStaffById(UUID id) {
        Optional<Staffs> byId = staffsRepository.findById(id);

        if (!byId.isPresent())
            return new ApiResponse("Not Found", false);

        String[] arr=new String[2];

        arr[0]=byId.get().getScore().toString();
        arr[1]=byId.get().getTodayScore().toString();

        return new ApiResponse("Success", true, arr);
    }

    @Override
    public ApiResponse getStaffScore(UUID userid, Long id) {

        return null;
    }


    // Hodimni taxrirlash ID bo`yicha
    @Override
    public ApiResponse updateStaff(StaffsDTO staffsDTO, UUID id) {
        Optional<Staffs> byId = staffsRepository.findById(id);

        if (!byId.isPresent())
            return new ApiResponse("Not Found", false);

        Staffs staffs=byId.get();

        staffs.setName(staffsDTO.getName());
        staffs.setLastName(staffsDTO.getLastName());
        staffs.setUsername(staffs.getUsername());
        staffs.setSystemRoleName(SystemRoleName.USER);
        staffs.setPassword(staffs.getPassword());

        staffsRepository.save(staffs);

        return new ApiResponse("Succesfully updated", true);
    }

    // Hodimni o`chirish ID bo`yicha
    @Override
    public ApiResponse deleteById(UUID id) {
//        boolean b = ;

        if (!staffsRepository.existsById(id))
            return new ApiResponse("Not Found", false);

        staffsRepository.deleteById(id);

        return new ApiResponse("Successfully deleted", true);
    }

    @Override
    public ApiResponse getStaffName(UUID id) {
        Optional<Staffs> byId = staffsRepository.findById(id);

        if (!byId.isPresent())
            return new ApiResponse("Not found", false);

        Dictionary getname = new Hashtable();

        getname.put("name", byId.get().getName());
        getname.put("lastname", byId.get().getLastName());

        return new ApiResponse("success", true, getname);
    }

    @Override
    public ApiResponse getStaffs() {
        List<Staffs> all = staffsRepository.findAllBySystemRoleName(SystemRoleName.USER);

        List<Map<String, String>> mm=new ArrayList<>();

        for (int i=0; i<all.size(); i++){
            mm.add(new HashMap<>());
            mm.get(i).put("name",  all.get(i).getName()+" "+all.get(i).getLastName());
            mm.get(i).put("last",  all.get(i).getScore().toString());
            mm.get(i).put("birth", all.get(i).getTodayScore().toString());
        }

//        String[][] ss=new String[all.size()][3];
//        for (int i=0;i< all.size();i++){
//            ss[i][0]=all.get(i).getName()+" "+all.get(i).getLastName();
//            ss[i][1]=all.get(i).getScore().toString();
//            ss[i][2]=all.get(i).getTodayScore().toString();
//        }

//        for (int i = 0; i < mm.size(); i++) {
//            System.out.println(mm.get(i).get("name"));
//        }

        return new ApiResponse("all staffs", true, mm);
    }

}
