package com.example.ppxprojextnew.Model;


import com.example.ppxprojextnew.Templates.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
//@Table(name = "RuyxatgaOlish")
public class Persons extends AbstractEntity {

    private String dateOfBirth;
    private String place;
    @Column(length = 100000)
    private String cause;

    private String witnessName;

    private String witnessLast;

    private String witnessFamily;

    private String witnessTel;

    @CreationTimestamp
    @JoinColumn(updatable = false)
    private Timestamp createdTime;

    private String fingerPerson;


    private String personImage;

    private String staffs;

}
