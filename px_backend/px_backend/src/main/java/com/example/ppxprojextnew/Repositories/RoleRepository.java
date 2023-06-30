package com.example.ppxprojextnew.Repositories;

import com.example.ppxprojextnew.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(String roleName);

    boolean existsByRoleName(String name);

    boolean existsByRoleNameAndIdNot(String name, Long id);
}
