package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.Maintenance;

public interface MaintenanceService {
	
	//Log the maintenance
	Maintenance logMaintenance(Maintenance maintenance);
	
	//// get the maintenance detail by id
	Maintenance getMaintenanceById(int id);
	
	//list all the maintenance tasks
	List<Maintenance> listAllMaintenanceTasks();
	
	//update the maintenance task
	Maintenance updateMaintenance(long id, Maintenance updatedMaintenance);
	
	//delete a maintenance
	void deleteMaintenance(int id);
	
	//link a maintenance to a property
	void linkMaintenanceToProperty(int maintenanceId, int propertyId);
	
	//list all the maintenances done on a property
	List<Maintenance> getMaintenanceByProperty(int propertyId);

}
