package com.wealth_management_system.BackWealthApp.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

}
