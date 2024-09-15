package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

import org.hibernate.mapping.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.MaintenanceRepository;
import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.service.MaintenanceService;

/*
 * A service class to implement methods for the maintenance entities
 */

@Service
public class MaintenanceServiceImpl implements MaintenanceService {
	private final MaintenanceRepository maintenanceRepository;
	private PropertyServiceImpl propertyService;
	
	@Autowired
	public MaintenanceServiceImpl(MaintenanceRepository maintenanceRepository) {
		this.maintenanceRepository = maintenanceRepository;
	}
	
	//Log the maintenance
	@Override
	public Maintenance logMaintenance(Maintenance maintenance) {
		return maintenanceRepository.save(maintenance);
	}
		
	// get the maintenance detail by id
	@Override
	public Optional<Maintenance> getMaintenanceById(int id) {
		return maintenanceRepository.findById((int)id);
	}
		
	//list all the maintenance tasks
	@Override
	public List<Maintenance> listAllMaintenanceTasks(){
		return maintenanceRepository.findAll();
	}
		
	//update the maintenance task
	@Override
	public Maintenance updateMaintenance(int id, Maintenance updatedMaintenance) {
		Optional<Maintenance> existingMaintenance = maintenanceRepository.findById((int)id);
		if(existingMaintenance.isPresent()) {
			Maintenance maintenance = existingMaintenance.get();
			maintenance.setDesc(updatedMaintenance.getDescr());
			maintenance.setLaborCost(updatedMaintenance.getLaberCost());
			maintenance.setPartsCost(updatedMaintenance.getPartsCost());
			maintenance.setProperty(updatedMaintenance.getProperty());
			maintenance.setCostTotal(updatedMaintenance.getCostTotal());
			return maintenanceRepository.save(maintenance);
		} else {
			throw new RuntimeException("Maintenance request not found");
		}
	}
		
	//delete a maintenance
	@Override
	public void deleteMaintenance(int id) {
		maintenanceRepository.deleteById((int)id);
	}
		
	//link a maintenance to a property
	@Override
	public void linkMaintenanceToProperty(int maintenanceId, int propertyId) {
		Optional<Maintenance> maintenanceRep = maintenanceRepository.findById((int)maintenanceId);
		Optional<Property> propertyRep = propertyService.findById(propertyId);
	}
		
	//list all the maintenances done on a property
	@Override
	public List<Maintenance> getMaintenanceByProperty(int propertyId){
		return propertyService.getMaintenanceByProperty(propertyId);
	}

}
