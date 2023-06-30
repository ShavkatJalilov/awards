package com.example.ppxprojextnew.Companent;

import com.example.ppxprojextnew.Model.Role;
import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Repositories.RoleRepository;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Templates.SystemRoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

import static com.example.ppxprojextnew.Companent.Permission.*;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    StaffsRepository staffsRepository;

    @Value(value = "${spring.sql.init.mode}")
    String initMode;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Successfully runner");
        Permission[] permissions=Permission.values();

        if (initMode.equals("always")){
            Role adminRole = roleRepository.save(new Role(
                    Constanta.ADMIN,
                    Arrays.asList(permissions)
            ));
            Role userRole = roleRepository.save(new Role(
                    Constanta.USER,
                    Arrays.asList(READ_ROLE, READ_USER, ADD_STATEMENT, ADD_GUARDS, ADD_WANTED, ADD_MISSING, ADD_WEAPONS, ADD_PERSONS, ADD_PROF )
            ));
//            userRepository.save(new Users(
//                    "Admin", "Admin", "admin@gmail.com", passwordEncoder.encode("admin"),"+998945744373", adminRole, true, null
//            ));
//            userRepository.save(new Users(
//                    "User", "User", "user@gmail.com", passwordEncoder.encode("user"),"+998945744373", userRole, true, null
//            ));
            staffsRepository.save(new Staffs(
                    "Admin",
                    "Admin",
                    0,
                    0,
                    "Adminpage",
                    passwordEncoder.encode("admin"),
                    SystemRoleName.ADMIN,
                    adminRole
                    )
            );

            staffsRepository.save(new Staffs(
                    "User",
                    "User",
                    0,
                    0,
                    "Userpage",
                    passwordEncoder.encode("user"),
                    SystemRoleName.USER,
                    userRole

            ));
        }
    }
}
