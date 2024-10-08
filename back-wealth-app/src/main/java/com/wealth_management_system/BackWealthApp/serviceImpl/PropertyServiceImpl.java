package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.LeaseRepository;
import com.wealth_management_system.BackWealthApp.repositry.MaintenanceRepository;
import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.repositry.RenterRepository;
import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.domain.Lease;
import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.service.PropertyService;

/*
 * A service class to manipulate the Property entity
 */
@Service
public class PropertyServiceImpl implements PropertyService {
	@Autowired
	private PropertyRepositry propertyRepository;
	@Autowired
	private RenterRepository renterRepository;
	@Autowired
	private LeaseRepository leaseRepository;
	@Autowired
	private MaintenanceRepository maintenanceRepository;
	@Autowired
	private UserRepositry userRepository;
	

	@Override
	public Property addProperty(Property property) {
		return propertyRepository.save(property);
	}

	@Override
	public Property getPropertyById(int id) {
		if(propertyRepository.findById(id).isPresent()) {
			return propertyRepository.findById(id).get();
		}else {
			throw new RuntimeException("Property not find");
		}
	}

	@Override
	public List<Property> listAllProperties() {
		return propertyRepository.findAll();
	}

	@Override
	public Property updateProperty(Property property) {
		if (propertyRepository.existsById(property.getId())) {
            return propertyRepository.save(property);
        } else {
            throw new RuntimeException("Property not found for update");
        }
	}

	@Override
	public void deleteProperty(int id) {
		propertyRepository.deleteById(id);
		
	}

	@Override
	public void linkRenterToProperty(int propertyId, int renterId) {
		 Property property = getPropertyById(propertyId);
	        Renter renter = renterRepository.findById(renterId)
	                .orElseThrow(() -> new RuntimeException("Renter not found"));

	        
	        property.addRenter(renter);
	        propertyRepository.save(property);
		
	}

	@Override
	public void linkLeaseToProperty(int propertyId, int leaseId) {
		 Property property = getPropertyById(propertyId);
	       
	     Lease lease = leaseRepository.findById(leaseId).orElseThrow(() -> new RuntimeException("Lease not found"));
	      property.addLease(lease); 
	        propertyRepository.save(property);
		
	}

	@Override
	public List<Renter> getRentersByProperty(int propertyId) {
		 Property property = getPropertyById(propertyId);
	     return renterRepository.findByProperty(property);
	}

	@Override
	public List<Maintenance> getMaintenanceByProperty(int propertyId) {
		Property property = getPropertyById(propertyId);
        return maintenanceRepository.findByProperty(property);
	}

	@Override
	public double calculateRevenue(int propertyId) {
		 Property property = getPropertyById(propertyId);
		 return property.getRevenue();
	     //return property.calculateRevenue();
	}

	@Override
	public List<Property> listPropertiesByUser(MyUser user) {
		// TODO Auto-generated method stub
		return propertyRepository.listByUser(user);
	}

}
