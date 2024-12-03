package com.wealth_management_system.BackWealthApp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.serviceImpl.MaintenanceServiceImpl;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController extends WebMvcAutoConfiguration {
	@Autowired
	private MaintenanceServiceImpl maintenanceService;
	
	@PostMapping("/log")
	public ResponseEntity<Maintenance> logMaintenance(@RequestBody Maintenance maintenance) {
		Maintenance newMaintenance = maintenanceService.logMaintenance(maintenance);
		return ResponseEntity.ok(newMaintenance);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Maintenance> getMaintenanceById(@PathVariable int id){
		Optional<Maintenance> maintenance = maintenanceService.getMaintenanceById(id);
		return maintenance.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@GetMapping("/list")
	public ResponseEntity<List<Maintenance>> listAllMaintenanceTasks(){
		return ResponseEntity.ok(maintenanceService.listAllMaintenanceTasks());
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Maintenance> updateMaintenance(@PathVariable int id, @RequestBody Maintenance maintenance){
		Maintenance updatedMaintenance = maintenanceService.updateMaintenance(id, maintenance);
		return ResponseEntity.ok(updatedMaintenance);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteMaintenance(@PathVariable int id){
		maintenanceService.deleteMaintenance(id);
		return ResponseEntity.ok("Maintenance task deleted successfully");
	}
	
	@GetMapping("/propertylist/{id}")
	public ResponseEntity<List<Maintenance>> listMaintenanceByProperty(@PathVariable int id){
		return ResponseEntity.ok(maintenanceService.getMaintenanceByProperty(id));
	}
	
}
