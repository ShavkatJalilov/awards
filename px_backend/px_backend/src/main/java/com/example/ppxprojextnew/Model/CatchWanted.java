package com.example.ppxprojextnew.Model;

import com.example.ppxprojextnew.Templates.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
//ushlangan qidiruvdagilar
public class CatchWanted extends AbstractEntity {


    private String cathWantedImages;


    private String wantedFingerPrint;

    private String staffs;
}

