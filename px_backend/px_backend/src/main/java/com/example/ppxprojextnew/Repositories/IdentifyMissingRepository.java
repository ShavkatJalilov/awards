package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.CatchWanted;
import com.example.ppxprojextnew.Model.IdentifiedMissing;
import com.example.ppxprojextnew.Model.Persons;
import com.example.ppxprojextnew.Model.Staffs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface IdentifyMissingRepository extends JpaRepository<IdentifiedMissing,Long> {
    boolean existsByFirstNameAndLastNameAndFamilyName(
            String firstName,
            String lastName,
            String familyName);
    boolean existsByIdNotAndFirstNameAndLastNameAndFamilyName(
            Long id,
            String firstName,
            String lastName,
            String familyName);
    List<IdentifiedMissing> findAllByStaffs(String staffs);
    List<IdentifiedMissing> findAllByTownAndMaxallaAndCreatedTimeBetween(
            String town,
            String maxalla,
            Timestamp createdTime,
            Timestamp createdTime2);
    List<IdentifiedMissing> findAllByCreatedTimeBetween(Timestamp createdTime, Timestamp createdTime2);


}
