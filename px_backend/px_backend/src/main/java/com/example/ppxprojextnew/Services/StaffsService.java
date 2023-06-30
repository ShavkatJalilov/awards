package com.example.ppxprojextnew.Services;

import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Payload.ApiResponse;
import com.example.ppxprojextnew.Payload.JwtResponse;
import com.example.ppxprojextnew.Payload.LoginDto;
import com.example.ppxprojextnew.Payload.StaffsDTO;
import com.example.ppxprojextnew.Repositories.StaffsRepository;
import com.example.ppxprojextnew.Security.TokenGenerator;
import com.example.ppxprojextnew.Templates.SystemRoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface StaffsService{


    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    ApiResponse getStaffs();

    ApiResponse updateStaff(StaffsDTO staffsDTO, UUID id);

    ApiResponse creatStaff(StaffsDTO staffsDTO);

    JwtResponse loginUser(LoginDto loginDTO);

    ApiResponse getStaffById(UUID id);

    ApiResponse getStaffScore(UUID userid, Long id);

    ApiResponse deleteById(UUID id);

    ApiResponse getStaffName(UUID id);

}
