package com.wealth_management_system.BackWealthApp.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.serviceImpl.MaintenanceServiceImpl;

@Controller
@RequestMapping("/maintenance")
public class MaintenanceController extends WebMvcAutoConfiguration {
	private final MaintenanceServiceImpl maintenanceService;
	
	@Autowired
	public MaintenanceController(MaintenanceServiceImpl maintenanceService) {
		this.maintenanceService = maintenanceService;
	}
	
	@PostMapping("/maintenance/log")
	public ResponseEntity<Maintenance> logMaintenance(@RequestBody Maintenance maintenance) {
		Maintenance newMaintenance = maintenanceService.logMaintenance(maintenance);
		return ResponseEntity.ok(newMaintenance);
	}
	
	@GetMapping("/maintenance/{id}")
	public ResponseEntity<Maintenance> getMaintenanceById(int id){
		Optional<Maintenance> maintenance = maintenanceService.getMaintenanceById(id);
		return maintenance.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@GetMapping("/maintenance/list")
	public List<Maintenance> listAllMaintenanceTasks(){
		return maintenanceService.listAllMaintenanceTasks();
	}
	
	@PutMapping("/maintenance/update/{id}")
	public ResponseEntity<Maintenance> updateMaintenance(@PathVariable int id, @RequestBody Maintenance maintenance){
		Maintenance updatedMaintenance = maintenanceService.updateMaintenance(id, maintenance);
		return ResponseEntity.ok(updatedMaintenance);
	}
	
	@DeleteMapping("/maintenance/delete/{id}")
	public ResponseEntity<String> deleteMaintenance(@PathVariable int id){
		maintenanceService.deleteMaintenance(id);
		return ResponseEntity.ok("Maintenance task deleted successfully");
	}
	
	@GetMapping("/maintenance/propertylist")
	public List<Maintenance> listMaintenanceByProperty(@PathVariable int id){
		return maintenanceService.getMaintenanceByProperty(id);
	}
	
}
