package com.wealth_management_system.BackWealthApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/user")
public class UserController {


    @Autowired
    private UserService userService;


    @PostMapping("/test")
    public String testConnection() {
        System.out.println("This is the test connection");
        return "Connection Successful!";
    }

    @GetMapping("/details")
    public Map<String, String> getUserDetails(Authentication authentication) {
        String username = authentication.getName();
        MyUser user = userService.getUserByUsername(username);
        HashMap<String, String> map = new HashMap<>();
        map.put("username", user.getUsername());
        map.put("email", user.getEmail());
        map.put("role", user.getRole());

        System.out.println("Getting the details: " + user.getUsername() + " " + user.getEmail() + " " + user.getRole());

//			model.addAttribute("user", user);

        return map;
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

    @PutMapping("/update-profile")
    public String updateUserProfile(@ModelAttribute MyUser updatedUser, Authentication authentication) {
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
        System.out.println(existingUser.getEmail());
        System.out.println(updatedUser.getEmail());

        userService.updateUser(existingUser);

        return "Successfully updated";


    }

    @GetMapping("/display-all")
    public List<MyUser> displayAllUsers(Authentication authentication) {
        if(!authentication.getAuthorities().toString().contains("ADMIN"))
            return null;
        System.out.println("Getting the list of users " + authentication.getAuthorities() + " " + authentication.getName());
        return userService.listAllUsers();
    }

    @PutMapping("/update-email")
    public String updateUserEmail(@RequestBody MyUser updatedUser, Authentication authentication) {
        String username = authentication.getName();
        MyUser existingUser = userService.getUserByUsername(username);
        existingUser.setEmail(updatedUser.getEmail());
        System.out.println(existingUser.getEmail());
        System.out.println(updatedUser.getEmail());
        userService.updateUser(existingUser);
        return "Successfully updated";
    }

    @PutMapping("/set-admin")
    public ResponseEntity<String> setAdmin(@RequestBody Integer id, Authentication authentication) {
        if(id == 0)
            return new ResponseEntity<>("id could not be sent", HttpStatus.BAD_REQUEST);
        MyUser user = userService.getUserById(id);
        System.out.println(authentication.getName() + " tried to set admin for " + userService.getUserById(id).getUsername());
        try{
            userService.setAdmin(user);
			return ResponseEntity.ok("Roles Updated");
		}catch(Exception e){
			return new ResponseEntity<>("User Already Admin", HttpStatus.CONFLICT);
		}
    }

    @DeleteMapping("/delete-user")
    public ResponseEntity<String> deleteUser(@RequestBody Integer id, Authentication authentication) {
        System.out.println(authentication.getName() + " tried to delete user " + userService.getUserById(id).getUsername());
        MyUser deletedUser = userService.getUserById(id);
        try {
            userService.deleteUser(deletedUser.getId());
            return ResponseEntity.ok("User Deleted");
        }catch (Exception e) {
            return new ResponseEntity<>("User Not Deleted or Does Not Exist", HttpStatus.CONFLICT);
        }
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
