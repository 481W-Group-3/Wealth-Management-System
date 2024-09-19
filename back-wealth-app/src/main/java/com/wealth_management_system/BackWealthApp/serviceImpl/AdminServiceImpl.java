package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.AdminRepository;
import com.wealth_management_system.BackWealthApp.domain.Admin;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.AdminService;

/*
 * A service class to manipulate the admin entity
 */
@Service
public class AdminServiceImpl implements AdminService{
	private final AdminRepository adminRepository;
	private UserServiceImpl userService;
	
	@Autowired
	public AdminServiceImpl(AdminRepository adminRepository) {
		this.adminRepository = adminRepository;
	}
	
	//add a new admin
	@Override
	public Admin createAdmin(Admin admin) {
		return adminRepository.save(admin);
	}
		
	//get an admin info by id
	@Override
	public Optional<Admin> getAdminById(int id) {
		Optional<Admin> adminRep = adminRepository.findById((int)id);
		return adminRep;
	}
		
	//get the list of all admins
	@Override
	public List<Admin> listAllAdmins(){
		return adminRepository.findAll();
	}
		
	//update an admin info
	@Override
	public Admin updateAdmin(Admin admin) {
		Optional<Admin> adminRep = adminRepository.findById((int)admin.getId());
		if(adminRep.isPresent()) {
			Admin existingAdmin = adminRep.get();
			existingAdmin.setEmail(admin.getEmail());
			existingAdmin.setPassword(admin.getPassword());
			return adminRepository.save(existingAdmin);
		} else {
			throw new RuntimeException("Admin not found");
		}
	}
		
	//delete an admin from the list
	@Override
	public void deleteAdmin(int id) {
		adminRepository.deleteById((int)id);
	}
		
	//reset a user's password
	@Override
	public void resetUserPassword(int userId, String password) {
		userService.changePassword(userId, password);
	}
		
	// monitor the system's health
	@Override
	public void monitorSystemHealth() {
		
	}
		
	//perform system maintenance
	@Override
	public void performSystemMaintenance() {
		
	}
		
	//list all the users
	@Override
	public List<MyUser> listAllUsers(){
		return userService.listAllUsers();
	}
		
	//delete a user's account
	@Override
	public void deleteUserAccount(int userId) {
		userService.deleteUser(userId);
	}
}
