package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.CatchWanted;
import com.example.ppxprojextnew.Model.PROF_Persons;
import com.example.ppxprojextnew.Model.Persons;
import com.example.ppxprojextnew.Model.Staffs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface Prof_persons_repository extends JpaRepository<PROF_Persons,Long> {
    boolean existsByFirstNameAndLastNameAndFamilyName(
            String firstName,
            String lastName,
            String familyName);
    boolean existsByIdNotAndFirstNameAndLastNameAndFamilyName(
            Long id,
            String firstName,
            String lastName,
            String familyName);
    List<PROF_Persons> findAllByStaffs(String staffs);
    List<PROF_Persons> findAllByTownAndMaxallaAndCreatedTimeBetween(
            String town,
            String maxalla,
            Timestamp createdTime,
            Timestamp createdTime2);

    List<PROF_Persons> findAllByCreatedTimeBetween(Timestamp createdTime, Timestamp createdTime2);

}
