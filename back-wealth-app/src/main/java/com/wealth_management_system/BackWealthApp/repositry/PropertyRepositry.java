package com.wealth_management_system.BackWealthApp.repositry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.Property;

@Repository
public interface PropertyRepositry extends JpaRepository<Property, Integer>{
	List<Property> findByCity(String city);
    List<Property> findByType(String type);
    List<Property> findByIncomeMonthlyGreaterThan(double amount);

}
