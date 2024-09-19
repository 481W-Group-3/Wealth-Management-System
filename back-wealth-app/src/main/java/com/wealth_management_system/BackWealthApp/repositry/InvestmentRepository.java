package com.wealth_management_system.BackWealthApp.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.Investment;



@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Integer>{

}
