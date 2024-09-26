package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.service.RenterService;

@Service
public class RenterServiceImpl implements RenterService{

	@Override
	public Renter addRenter(Renter renter) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Renter getRenterById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Renter> listAllRenters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Renter updateRenter(Renter renter) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteRenter(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Property> getPropertiesByRenter(int renterId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void linkRenterToLease(int renterId, int leaseId) {
		// TODO Auto-generated method stub
		
	}

}
