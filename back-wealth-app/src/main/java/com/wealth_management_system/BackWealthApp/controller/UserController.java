package com.wealth_management_system.BackWealthApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.UserService;



@RestController
//@RequestMapping(path="/userDetails")
public class UserController {
	
	
		@Autowired
	    private UserService userService;
		
		 @GetMapping("/user/form")
		    public String showUserForm(Model model) {
		        model.addAttribute("user", new MyUser());
		        return "user-form";  // Refers to user-form.html in templates
		    }

	 
	 // Handle form submission for creating a new user
	    @PostMapping("/create")
	    public String createUser(@ModelAttribute MyUser user) {
	        userService.createUser(user);
	        return "redirect:/users/list";
	    }
	
	

}
