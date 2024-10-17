package com.wealth_management_system.BackWealthApp.service;

import java.util.*;

import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;

public interface PropertyService {
	
	//add a property to the list
	Property addProperty(Property property, String username);
	
	//get property by Id
	Property getPropertyById(int id);
	
	//list all the properties owned by the user
	List<Property> listAllProperties();
	
	//List properties by user id
	List<Property> getUserProperties(int userId);
	
	//update Property
	Property updateProperty(Property property);
	
	//delete any property by id
	void deleteProperty(int id);
	
	//link a renter to the property
	void linkRenterToProperty(int propertyId, int renterId);
	
	//link lease to property
	void linkLeaseToProperty(int propertyId, int leaseId);
	
	//get the list of renters for property
	List<Renter> getRentersByProperty(int propertyId);
	
	//get the list of maintenance done for property
	List<Maintenance> getMaintenanceByProperty(int propertyId);
	
	//calculate the revenue
	double calculateRevenue(int propertyId);

}
