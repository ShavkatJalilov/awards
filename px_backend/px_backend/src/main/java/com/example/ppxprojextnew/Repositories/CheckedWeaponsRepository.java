package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.CatchWanted;
import com.example.ppxprojextnew.Model.CheckedWeapons;
import com.example.ppxprojextnew.Model.Staffs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface CheckedWeaponsRepository extends JpaRepository<CheckedWeapons, Long> {

    boolean existsByGunBrandAndGunNumber(String gunBrand, String gunNumber);
    boolean existsByIdNotAndGunBrandAndGunNumber(Long id, String gunBrand, String gunNumber);
    List<CheckedWeapons> findAllByStaffs(String staffs);

    List<CheckedWeapons> findAllByTownAndMaxallaAndCreatedTimeBetween(
            String town,
            String maxalla,
            Timestamp createdTime,
            Timestamp createdTime2);
    List<CheckedWeapons> findByCreatedTimeBetween(Timestamp createdTime, Timestamp createdTime2);
    List<CheckedWeapons> findAllByCreatedTimeBetween(Timestamp createdTime, Timestamp createdTime2);
}
