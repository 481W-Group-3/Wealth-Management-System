package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;

public interface RenterService {
	
	//add a renter to the property
	Renter addRenter(Renter renter);
	
	//get the renter by id
	Renter getRenterById(int id);
	
	//get the list of renters
	List<Renter> listAllRenters();
	
	//update the renter
	Renter updateRenter(Renter renter);
	
	//delete a renter
	void deleteRenter(int id);
	
	//get a list of properties by renters
	List<Property> getPropertiesByRenter(int renterId);
	
	//link the renters to lease
	void linkRenterToLease(int renterId, int leaseId);

}
