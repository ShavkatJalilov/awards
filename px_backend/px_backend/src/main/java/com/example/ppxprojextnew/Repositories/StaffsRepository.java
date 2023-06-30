package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.Staffs;
import com.example.ppxprojextnew.Templates.SystemRoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StaffsRepository extends JpaRepository<Staffs, UUID> {
    Optional<Staffs> findByUsername(String username);
    boolean existsByIdNotAndNameAndLastNameAndUsername(UUID id, String name, String lastName, String username);
    List<Staffs> findAllBySystemRoleName(SystemRoleName systemRoleName);

}
