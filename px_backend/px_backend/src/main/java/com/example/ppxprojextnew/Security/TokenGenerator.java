package com.example.ppxprojextnew.Security;

import com.example.ppxprojextnew.Templates.SystemRoleName;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TokenGenerator {
    String passsword="0000";
    long time=48*60*60*1000;
    public String token(String username){


        Date muddat=new Date(System.currentTimeMillis()+time);


        String tokenn = Jwts
                .builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(muddat)
                .claim("roles",SystemRoleName.USER)
                .signWith(SignatureAlgorithm.HS512, passsword)
                .compact();
        return  tokenn;
    }
    public boolean tokenCheck(String token){
        Jwts
                .parser()
                .setSigningKey(passsword)
                .parseClaimsJws(token);
        return true;
    }

    public String usernameolish(String token){
        String subject = Jwts
                .parser()
                .setSigningKey(passsword)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return subject;
    }

    public String generateJwtToken(Authentication authentication, SystemRoleName systemRoleName) {

        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        return Jwts
                .builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + time))
                .claim("roles", systemRoleName)
                .signWith(SignatureAlgorithm.HS256, passsword)
                .compact();
    }
    String password = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    public String userCheck(String username){
        return Jwts
                .parser()
                .setSigningKey(password)
                .parseClaimsJws(username)
                .getBody()
                .getSubject();

    }

}
