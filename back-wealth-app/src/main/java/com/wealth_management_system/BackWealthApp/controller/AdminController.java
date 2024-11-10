package com.wealth_management_system.BackWealthApp.controller;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wealth_management_system.BackWealthApp.domain.Admin;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.serviceImpl.AdminServiceImpl;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	private final AdminServiceImpl adminService;

	//@Autowired
	public AdminController(AdminServiceImpl adminService) {
		this.adminService = adminService;
	}

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
