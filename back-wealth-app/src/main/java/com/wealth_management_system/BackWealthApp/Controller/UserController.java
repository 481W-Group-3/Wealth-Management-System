package com.wealth_management_system.BackWealthApp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wealth_management_system.BackWealthApp.domain.User;
import com.wealth_management_system.BackWealthApp.service.UserService;

@Controller
@RequestMapping(path="/userDetails")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user){
		return null;
		
	}
	
	

}