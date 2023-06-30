package com.example.ppxprojextnew.Model;

import com.example.ppxprojextnew.Companent.Permission;
import com.example.ppxprojextnew.Templates.AbctractEntityRole;
import com.example.ppxprojextnew.Templates.AbstractEntity;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Role extends AbctractEntityRole {

    private String roleName;

    @Enumerated(value = EnumType.STRING)
    @ElementCollection
    private List<Permission> permissions;
}
