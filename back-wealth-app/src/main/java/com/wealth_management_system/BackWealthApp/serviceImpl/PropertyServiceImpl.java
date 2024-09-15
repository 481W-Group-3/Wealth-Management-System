package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.service.PropertyService;

/*
 * A service class to manipulate the Property entity
 */

public class PropertyServiceImpl implements PropertyService {
	private final PropertyRepositry propertyRepository;
	
	@Autowired
	public PropertyServiceImpl(PropertyRepositry propertyRepository) {
		this.propertyRepository = propertyRepository;
	}

	@Override
	public Property addProperty(Property property) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Property getPropertyById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Property> listAllProperties() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Property updateProperty(Property property) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteProperty(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void linkRenterToProperty(int propertyId, int renterId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void linkLeaseToProperty(int propertyId, int leaseId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Renter> getRentersByProperty(int propertyId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Maintenance> getMaintenanceByProperty(int propertyId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public double calculateRevenue(int propertyId) {
		// TODO Auto-generated method stub
		return 0;
	}

}
