package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.MyUser;

public interface UserService {

	// save a user
	MyUser createUser(MyUser user) throws Exception;

	// get a user by user name
	MyUser getUserByUsername(String user);

	// get a user by email
	MyUser getUserByEmail(String email);

	// Get user by id
	MyUser getUserById(int id);

	// update a user
	MyUser updateUser(MyUser user);

	// list all the users
	List<MyUser> listAllUsers();

	// change password
	void changePassword(int userId, String newPassword);

	// reset password
	void resetPassword(String email);

	// Link the user to property using id
	void linkUserToProperty(int userId, int propertyId);

	// set role of user
	MyUser setRole(MyUser user, String role);

	// add admin role to user
	MyUser setAdmin(MyUser user) throws Exception;

	// set image to user
	MyUser setImage(MyUser user, byte[] image);

	// delete user
	void deleteUser(int id);

}
