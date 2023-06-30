package com.example.ppxprojextnew.Model;

import com.example.ppxprojextnew.Templates.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
//@Table(name = "Bayonnomalar")
public class Statement extends AbstractEntity {


    private String dateOfBirth;

    private String fromPlace;

    private String statement;

    private String staffComment;

    private String fingerprint;

    private String image;

    private String staffs;

}
