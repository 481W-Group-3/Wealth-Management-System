package com.wealth_management_system.BackWealthApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.UserService;

@Controller
@RequestMapping(path="/userDetails")
public class UserController {
	
//	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<MyUser> createUser(@RequestBody MyUser user){
		return null;
		
	}
	
	

}
