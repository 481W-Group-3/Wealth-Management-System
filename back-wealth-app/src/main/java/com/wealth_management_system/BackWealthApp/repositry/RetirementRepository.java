package com.wealth_management_system.BackWealthApp.repositry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Retirement;

@Repository
public interface RetirementRepository extends JpaRepository<Retirement, Integer>{
	List<Retirement> findByUser(MyUser user);
}
