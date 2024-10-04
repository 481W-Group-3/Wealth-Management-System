package com.wealth_management_system.BackWealthApp.repositry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;

@Repository
public interface RenterRepository extends JpaRepository<Renter, Integer>{

	List<Renter> findByProperty(Property property);

}
