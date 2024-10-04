package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.repositry.RenterRepository;
import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.service.PropertyService;

/*
 * A service class to manipulate the Property entity
 */
@Service
public class PropertyServiceImpl implements PropertyService {
	private PropertyRepositry propertyRepository;
	private RenterRepository renterRepository;
	
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
		if(propertyRepository.findById(id).isPresent()) {
			return propertyRepository.findById(id).get();
		}else {
			throw new RuntimeException("Property not find");
		}
	}

	@Override
	public List<Property> listAllProperties() {
		// TODO Auto-generated method stub
		return propertyRepository.findAll();
	}

	@Override
	public Property updateProperty(Property property) {
		// TODO Auto-generated method stub
		 if (!propertyRepository.existsById(property.getId())) {
	            throw new RuntimeException("Property not found");
	        }
	        return propertyRepository.save(property); // Update and return the property
	}

	@Override
	public void deleteProperty(int id) {
		// TODO Auto-generated method stub
		if (!propertyRepository.existsById(id)) {
            throw new RuntimeException("Property not found");
        }
        propertyRepository.deleteById(id); // Delete the property by ID
		
	}

	@Override
	public void linkRenterToProperty(int propertyId, int renterId) {
		// TODO Auto-generated method stub
		Optional<Property> propertyOptional = propertyRepository.findById(propertyId);
        Optional<Renter> renterOptional = renterRepository.findById(renterId);

        if (propertyOptional.isPresent() && renterOptional.isPresent()) {
            Property property = propertyOptional.get();
            Renter renter = renterOptional.get();
            
            // Add the renter to the property
            //property.addRenter(renter); // Assuming addRenter method exists in Property class
            propertyRepository.save(property); // Save the updated property
        } else {
            throw new RuntimeException("Property or Renter not found");
        }
		
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
