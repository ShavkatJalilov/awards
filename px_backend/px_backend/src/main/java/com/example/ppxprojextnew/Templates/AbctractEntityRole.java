package com.example.ppxprojextnew.Templates;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbctractEntityRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
