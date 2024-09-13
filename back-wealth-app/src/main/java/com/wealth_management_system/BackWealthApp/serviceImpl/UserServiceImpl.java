package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.Repositry.UserRepositry;
import com.wealth_management_system.BackWealthApp.domain.User;
import com.wealth_management_system.BackWealthApp.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepositry userRepository;
	
	
	@Override
	public User createUser(User user) {
		// TODO Auto-generated method stub
		
		return userRepository.save(user);
	}

	@Override
	public User getUserByUsername(String user) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(user);
	}

	@Override
	public List<User> listAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public void changePassword(int userId, String newPassword) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void resetPassword(String email) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void linkUserToProperty(int userId, int propertyId) {
		// TODO Auto-generated method stub
		
	}

	

}
