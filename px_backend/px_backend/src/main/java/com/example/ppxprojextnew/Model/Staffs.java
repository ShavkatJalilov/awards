package com.example.ppxprojextnew.Model;

import com.example.ppxprojextnew.Companent.Permission;
import com.example.ppxprojextnew.Templates.SystemRoleName;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Staffs implements UserDetails {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2",strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    private String name;

    private String lastName;

    private String username;

    private String password;

    private Integer score;

    private String dateScore;

    private Integer todayScore;

    @Enumerated(EnumType.ORDINAL)
    private SystemRoleName systemRoleName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @ToString.Exclude
    private Role role;

    public Staffs(
            String name,
            String lastName,
            Integer score,
            Integer todayScore,
            String username,
            String password,
            SystemRoleName systemRoleName,
            Role role
    ) {
        this.name = name;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.systemRoleName = systemRoleName;
        this.role=role;
        this.score=score;
        this.todayScore=todayScore;
    }
    private boolean enabled=true;

    private boolean isAccountNonExpired=true;
    private boolean isAccountNonLocked=true;
    private boolean isCredentialsNonExpired=true;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<Permission> roleTypes = role.getPermissions();
        List<GrantedAuthority> grantedAuthorities=new ArrayList<>();
        for (Permission i: roleTypes){
            grantedAuthorities.add(new SimpleGrantedAuthority(i.name()));
        }
        return grantedAuthorities;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }
}
