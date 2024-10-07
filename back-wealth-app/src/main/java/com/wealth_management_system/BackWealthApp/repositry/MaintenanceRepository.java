package com.wealth_management_system.BackWealthApp.repositry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.domain.Property;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, Integer>{

	List<Maintenance> findByProperty(Property property);
}
