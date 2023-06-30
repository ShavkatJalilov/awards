package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.CatchWanted;
import com.example.ppxprojextnew.Model.GuardsObjects;
import com.example.ppxprojextnew.Model.Persons;
import com.example.ppxprojextnew.Model.Staffs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface GuardsRepository extends JpaRepository<GuardsObjects,Long> {

    boolean existsByFirstNameAndLastNameAndFamilyName(String firstName, String lastName, String familyName);
    List<GuardsObjects> findAllByStaffs(String staffs);
    List<GuardsObjects> findAllByTownAndMaxallaAndCreatedTimeBetween(
            String town,
            String maxalla,
            Timestamp createdTime,
            Timestamp createdTime2);
    List<GuardsObjects> findAllByCreatedTimeBetween(Timestamp createdTime, Timestamp createdTime2);

}
