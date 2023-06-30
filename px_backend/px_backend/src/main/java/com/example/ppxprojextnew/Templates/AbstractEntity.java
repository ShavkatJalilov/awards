package com.example.ppxprojextnew.Templates;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractEntity {
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

    @CreationTimestamp
    @JoinColumn(updatable = false)
    private Timestamp createdTime;
}
