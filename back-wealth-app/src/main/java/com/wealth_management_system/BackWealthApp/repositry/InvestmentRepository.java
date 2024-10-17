package com.wealth_management_system.BackWealthApp.repositry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.domain.MyUser;



@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Integer>{
	List<Investment> findByUser(MyUser user);

}
