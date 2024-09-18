package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.MyUser;

public interface UserService {
	
	//save a user
	MyUser createUser(MyUser user);
	
	//get a user by user name
	MyUser getUserByUsername(String user);
	
	//update a user
	void updateUser(MyUser user);
	
	//list all the users
	List<MyUser> listAllUsers();
	
	//change password
	void changePassword(int userId, String newPassword);
	
	//reset password
	void resetPassword(String email);
	
	//Link the user to property using id
	void linkUserToProperty(int userId, int propertyId);
	
	//delete user
	void deleteUser(int id);
	

}
