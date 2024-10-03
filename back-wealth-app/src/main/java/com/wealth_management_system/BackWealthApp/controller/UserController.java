package com.wealth_management_system.BackWealthApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.UserService;

@RestController
//@RequestMapping(path="/user")
public class UserController {
	
	
		@Autowired
	    private UserService userService;
		
		
		@PostMapping("/test")
	    public String testConnection() {
			System.out.println("This is the test connection");
	        return "Connection Successful!";
	    }
		
		@GetMapping("/details")
		public String getUserDetails(Model model, Authentication authentication) {
			String username = authentication.getName();
			MyUser user = userService.getUserByUsername(username);
			/*
			if(user == null) {
				return "error/404";
			}
			*/
			
			model.addAttribute("user", user);
			
			return "user-details";
		}
		 
		 @GetMapping("/update-profile")
		    public String showUpdateProfileForm(Model model, Authentication authentication) {
		        String username = authentication.getName();
		        MyUser user = userService.getUserByUsername(username);
/*
		        if (user == null) {
		            return "error/404"; // Ensure you have a 404 error page
		        }
*/
		        model.addAttribute("user", user);
		        return "update-profile";
		    }

		@PostMapping("update-profile")
		public String updateUserProfile(@ModelAttribute MyUser updatedUser, Authentication authentication, RedirectAttributes redirectAttributes) {
			String username = authentication.getName();
			MyUser existingUser = userService.getUserByUsername(username);
			/*
			if(existingUser == null) {
				return "error/404";
			}
			*/
			/*existingUser.setEmail(updatedUser.getEmail());
	        existingUser.setUsername(updatedUser.getUsername());
	        userService.createUser(existingUser);*/
			System.out.println("Outside the if statement");
	        System.out.println(existingUser.getUsername());
			 // Update fields conditionally
		    if (updatedUser.getUsername() != null && !existingUser.getUsername().equals(updatedUser.getUsername())) {
		    	System.out.println("Inside the if stamenet");
		    	System.out.println(existingUser.getUsername());
		    	System.out.println(updatedUser.getUsername());
		        existingUser.setUsername(updatedUser.getUsername()); // Update only if username has changed
		        System.out.println("After updating");
		        System.out.println(existingUser.getUsername());
		        System.out.println(updatedUser.getUsername());
		    }
	        existingUser.setEmail(updatedUser.getEmail()); // Always update email
	        System.out.println("outside the if");
	        System.out.println(existingUser.getUsername());
	        System.out.println(updatedUser.getUsername());

	        userService.updateUser(existingUser);

	        redirectAttributes.addFlashAttribute("message", "Profile updated successfully!");
	        return "redirect:/details"; 
			
			
		}
/*	
		@PostMapping("/delete-account")
		public String deleteUserAccount(Authentication authentication, RedirectAttributes redirectAttributes) {
			String username = authentication.getName();
	        MyUser user = userService.getUserByUsername(username);
/*
	        if (user == null) {
	            return "error/404"; // Return 404 template if user not found
	        }
	    *   
	        userService.deleteUser(user.getId()); // Use the service method to delete the user

	        redirectAttributes.addFlashAttribute("message", "User account deleted successfully.");
	        return "redirect:/login";
		
		}
	
	*/

}
