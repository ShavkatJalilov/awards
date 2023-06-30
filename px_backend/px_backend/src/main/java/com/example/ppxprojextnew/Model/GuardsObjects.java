package com.example.ppxprojextnew.Model;

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
//@Table(name = "Obyektdagiqorovullar")
public class GuardsObjects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String familyName;

    private String phoneNumber;

    private String town;

    private String maxalla;

    private String location;

    @Column(length = 100000)
    private String comment;


    private String staffs;

    @CreationTimestamp
    @JoinColumn(updatable = false)
    private Timestamp createdTime;

}
