package com.wealth_management_system.BackWealthApp.controller;

import java.util.*;

import com.wealth_management_system.BackWealthApp.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.wealth_management_system.BackWealthApp.domain.Admin;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.serviceImpl.AdminServiceImpl;

@RestController
@RequestMapping(path = "/admin")
public class AdminController {

	@Autowired
	private AdminServiceImpl adminService;
	@Autowired
	private UserServiceImpl userService;

	@PostMapping("/admin/create")
	public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin){
		Admin newAdmin = adminService.createAdmin(admin);
		return ResponseEntity.ok(newAdmin);
	}

	@GetMapping("/admin/{id}")
	public ResponseEntity<Admin> getAdminById(@PathVariable int id){
		Optional<Admin> admin = adminService.getAdminById(id);
		return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/admin/list")
	public List<Admin> listAllAdmin(){
		return adminService.listAllAdmins();
	}

	@PutMapping("/admin/update/{id}")
	public ResponseEntity<Admin> updateAdmin(@RequestBody Admin admin){
		Admin updatedAdmin = adminService.updateAdmin(admin);
		return ResponseEntity.ok(updatedAdmin);
	}

	@DeleteMapping("/admin/delete/{id}")
	public ResponseEntity<String> deleteAdmin(@PathVariable int id){
		adminService.deleteAdmin(id);
		return ResponseEntity.ok("This admin has deleted successfully");
	}

	@PutMapping("/user/reset/{id}")
	public ResponseEntity<String> resetUserPassword(@PathVariable int userId, @RequestBody String password){
		adminService.resetUserPassword(userId, password);
		return ResponseEntity.ok("User password reset successfully");
	}

	//Monitor system health

	//Perform system maintenance

	@GetMapping("/user/list")
	public List<MyUser> listAllUsers(){
		return adminService.listAllUsers();
	}

	@DeleteMapping("/user/delete/{id}")
	public ResponseEntity<String> deleteUserAccount(int userId){
		adminService.deleteUserAccount(userId);
		return ResponseEntity.ok("User has been deleted successfully");
	}

}
