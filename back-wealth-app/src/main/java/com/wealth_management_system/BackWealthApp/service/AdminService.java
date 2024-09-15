package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.Admin;
import com.wealth_management_system.BackWealthApp.domain.MyUser;

public interface AdminService {
	
	//add a new admin
	Admin createAdmin(Admin admin);
	
	//get an admin info by id
	Admin getAdminById(long id);
	
	//get the list of all admins
	List<Admin> listAllAdmins();
	
	//update an admin info
	Admin updateAdmin(Admin admin);
	
	//delete an admin from the list
	void deleteAdmin(long id);
	
	//reset a user's password
	void resetUserPassword(long userId, String password);
	
	// monitor the system's health
	void monitorSystemHealth();
	
	//perform system maintenance
	void performSystemMaintenance();
	
	//list all the users
	List<MyUser> listAllUsers();
	
	//delete a user's account
	void deleteUserAccount(long userId);

}
