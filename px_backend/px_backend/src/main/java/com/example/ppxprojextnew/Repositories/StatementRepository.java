package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.CatchWanted;
import com.example.ppxprojextnew.Model.Persons;
import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Model.Statement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface StatementRepository extends JpaRepository<Statement,Long> {
    boolean existsByFirstNameAndLastNameAndFamilyName(
            String firstName,
            String lastName,
            String familyName);
    boolean existsByIdNotAndFirstNameAndLastNameAndFamilyName(
            Long id,
            String firstName,
            String lastName,
            String familyName);
    List<Statement> findAllByTownAndMaxallaAndCreatedTimeBetween(String town, String maxalla, Timestamp createdTime, Timestamp createdTime2);
    List<Statement> findAllByStaffs(String staffs);
    List<Statement> findAllByCreatedTimeBetween(Timestamp createdTime, Timestamp createdTime2);


}
