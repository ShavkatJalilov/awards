package com.example.ppxprojextnew.Model;

import com.example.ppxprojextnew.Templates.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class PROF_Persons extends AbstractEntity {

    private String dateOfBirth;

    private String PROFPersons;

    private String staffs;
}
