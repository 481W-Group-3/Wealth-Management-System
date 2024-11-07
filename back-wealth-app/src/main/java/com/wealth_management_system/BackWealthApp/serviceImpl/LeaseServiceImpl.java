package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.wealth_management_system.BackWealthApp.domain.Lease;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.repositry.LeaseRepository;
import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.repositry.RenterRepository;
import com.wealth_management_system.BackWealthApp.service.LeaseService;

public class LeaseServiceImpl implements LeaseService {

	@Autowired
	private PropertyRepositry propertyRepository;
	@Autowired
	private RenterRepository renterRepository;
	@Autowired
	private LeaseRepository leaseRepository;
	
	@Override
	public Lease createLease(Lease lease) {
		
		Lease newLease = leaseRepository.save(lease);
		return newLease;
	}

	@Override
	public Lease getLeaseById(int id) {
		Optional<Lease> optionalLease = leaseRepository.findById(id);
		Lease lease = optionalLease.get();
		return lease;
	}

	@Override
	public List<Lease> listAllLeases() {
		
		return null;
	}
	
	@Override
	public List<Lease> listByProperty(int propertyId){
		Optional<Property> property = propertyRepository.findById(propertyId);
		List<Lease> leases = property.get().getLeases();
		return leases;
	}

	@Override
	public Lease updateLease(int id, Lease newLease) {
		Optional<Lease> originalLease = leaseRepository.findById(id);
		Lease ogLease = originalLease.get();
		ogLease.setLeaseType(newLease.getLeaseType());
		ogLease.setPaymentMonthly(newLease.getPaymentMonthly());
		return ogLease;
	}

	@Override
	public void deleteLease(int id) {
		leaseRepository.deleteById(id);
	}

	@Override
	public void linkLeaseToProperty(int leaseId, int propertyId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void linkRenterToLease(int leaseId, int renterId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Renter> getRentersByLease(int leaseId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void sendLeaseRenewalReminders(int leaseId) {
		// TODO Auto-generated method stub
		
	}

}
