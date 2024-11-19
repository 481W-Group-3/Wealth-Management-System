package com.wealth_management_system.BackWealthApp.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.MyUser;

@Repository
public interface UserRepositry extends JpaRepository<MyUser, Integer> {
	MyUser findMyUserByUsername(String username);
	MyUser findByEmail(String email);
	MyUser findById(int id);
//	List<User> findByEmail(String email);
	void deleteMyUserByUsername(String username);
	void deleteMyUserByEmail(String email);
    

}
