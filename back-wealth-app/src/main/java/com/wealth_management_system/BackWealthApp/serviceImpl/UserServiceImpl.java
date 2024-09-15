package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepositry userRepository;
	
	
	@Override
	public MyUser createUser(MyUser user) {
		// TODO Auto-generated method stub
		
		return userRepository.save(user);
	}

	@Override
	public MyUser getUserByUsername(String user) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(user);
	}

	@Override
	public List<MyUser> listAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public void changePassword(long userId, String newPassword) {
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
	
	@Override
	public void deleteUser(long id) {
		userRepository.deleteById((int)id);
	}

	

}
