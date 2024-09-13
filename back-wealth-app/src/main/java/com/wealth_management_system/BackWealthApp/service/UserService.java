package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.User;
 
public interface UserService {
	
	
	//save a user
	User createUser(User user);
	
	//get a user by user name
	User getUserByUsername(String user);
	
	//list all the users
	List<User> listAllUsers();
	
	//change password
	void changePassword(int userId, String newPassword);
	
	//reset password
	void resetPassword(String email);
	
	//Link the user to property using id
	void linkUserToProperty(int userId, int propertyId);
	

}
