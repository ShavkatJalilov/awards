package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.Persons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface PersonsRepository extends JpaRepository<Persons, Long> {
    boolean existsByFirstNameAndLastNameAndFamilyName(
            String firstName,
            String lastName,
            String familyName);
    boolean existsByIdNotAndFirstNameAndLastNameAndFamilyName(
            Long id,
            String firstName,
            String lastName,
            String familyName);
    List<Persons> findAllByStaffs(String staffs);
    List<Persons> findAllByTownAndMaxallaAndCreatedTimeBetween(
            String town,
            String maxalla,
            Timestamp createdTime,
            Timestamp createdTime2);
    List<Persons> findAllByCreatedTimeBetween(Timestamp createdTime, Timestamp createdTime2);
}
