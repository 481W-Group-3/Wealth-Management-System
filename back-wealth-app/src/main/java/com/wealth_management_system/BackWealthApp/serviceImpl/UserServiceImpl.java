package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.UserService;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepositry userRepository;
	
	
	@Override
	public MyUser createUser(MyUser user) {
		if(userRepository.findMyUserByUsername(user.getUsername()) != null) {
			System.out.println("User already exists");
			return null;
		}
		return userRepository.save(user);
	}


	@Override
	public MyUser getUserByUsername(String user) {
		return userRepository.findMyUserByUsername(user);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<MyUser> user = Optional.ofNullable(userRepository.findMyUserByUsername(username));

		if(user.isPresent()) {
			var userObj = user.get();
			return User.builder()
					.username(userObj.getUsername())
					.password(userObj.getPassword())
					.roles(userObj.getRole())
					.build();
		}
		else{
			throw new UsernameNotFoundException(username);
		}
	}
	/*
	public void updateUser(MyUser user) {
	    // Check if user exists before updating
	    if (userRepository.existsById(user.getId())) 
	        userRepository.save(user);
	        }
	*/    
	

	@Override
	public List<MyUser> listAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public void changePassword(int userId, String newPassword) {

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
	public void deleteUser(int id) {
		userRepository.deleteById((int)id);
	}

	@Override
	public MyUser getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public void updateUser(MyUser user) {
		// TODO Auto-generated method stub
		
	}

	

}
