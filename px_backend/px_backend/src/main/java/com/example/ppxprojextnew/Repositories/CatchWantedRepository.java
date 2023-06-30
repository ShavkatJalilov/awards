package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.CatchWanted;
import com.example.ppxprojextnew.Model.Persons;
import com.example.ppxprojextnew.Model.Staffs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface CatchWantedRepository extends JpaRepository<CatchWanted, Long> {
    boolean existsByFirstNameAndLastNameAndFamilyName(String firstName, String lastName, String familyName);
    boolean existsByIdNotAndFirstNameAndLastNameAndFamilyName(Long id, String firstName, String lastName, String familyName);

    Optional<CatchWanted> findByFirstNameAndLastNameAndFamilyName(String firstName, String lastName, String familyName);

    List<CatchWanted> findAllByStaffs(String staffs);
    List<CatchWanted> findAllByTownAndMaxallaAndCreatedTimeBetween(
            String town,
            String maxalla,
            Timestamp createdTime,
            Timestamp createdTime2);

    List<CatchWanted> findAllByCreatedTimeBetween(Timestamp createdTime, Timestamp createdTime2);

}
