package com.wealth_management_system.BackWealthApp.Repositry;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.User;

@Repository
public interface UserRepositry extends JpaRepository<User, Integer> {
	User findByUsername(String username);
	List<User> findByEmail(String email);
    

}
