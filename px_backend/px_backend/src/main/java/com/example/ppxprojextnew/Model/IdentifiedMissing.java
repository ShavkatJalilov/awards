package com.example.ppxprojextnew.Model;

import com.example.ppxprojextnew.Templates.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
//@Table(name ="AniqlanganBedaraklar")
public class IdentifiedMissing extends AbstractEntity {

    private String dateOfBirth;

    private String missingFingerPrint;

    private String identifyMissingImages;

    private String staffs;

}
