package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.UserRepository;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.UserService;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	/*
	@Autowired
	private PropertyRepositry propertyRepository;
	*/
	
	
	@Override
	public MyUser createUser(MyUser user) throws Exception{

		Optional<MyUser> username = Optional.ofNullable(userRepository.findMyUserByUsername(user.getUsername()));
		Optional<MyUser> email = Optional.ofNullable(userRepository.findByEmail(user.getEmail()));
		if(username.isPresent() && email.isPresent()){
			throw new Exception("User already exists");
		}
		return userRepository.save(user);
	}


	@Override
	public MyUser getUserByUsername(String user) {
		return userRepository.findMyUserByUsername(user);
	}
	
	@Override
	public MyUser getUserById(int id) {
		return userRepository.findById(id);
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
	public MyUser updateUser(MyUser user) {
		return userRepository.save(user);
	}

//	@Override
//	public void updateUser(MyUser user, MyUser updatedUser) {
//		user.setUsername(updatedUser.getUsername());
//		user.setEmail(updatedUser.getEmail());
//		user.setPassword(updatedUser.getPassword());
//	}

	@Override
	public MyUser setRole(MyUser user, String role){
		user.setRole(role);
		return userRepository.save(user);
	}

	@Override
	public MyUser setAdmin(MyUser user) throws Exception{
		if(user.isAdmin())
			throw new Exception("User is already an Admin");
		else
			user.addRole("ADMIN");
		return userRepository.save(user);
	}

	public String[] getRoles(MyUser user) {
		if(user.getRoles().isEmpty())
			return new String[] {"USER"};
		return user.getRoles().toArray(new String[] {});
	}

	/*
	@Override
	public void addPropertyToUser(int userId, Property property) {
		MyUser user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		property.setUser(user);
		propertyRepository.save(property);
		
	}
	*/

	

}
