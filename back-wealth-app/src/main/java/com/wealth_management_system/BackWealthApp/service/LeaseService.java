package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.Lease;
import com.wealth_management_system.BackWealthApp.domain.Renter;

public interface LeaseService {

	// create a lease for a property
	Lease createLease(Lease lease);

	// get a lease by Id
	Lease getLeaseById(int id);

	// list all the leases
	List<Lease> listAllLeases();

	// List all leases for the given property
	List<Lease> listByProperty(int propertyId);

	// update any lease
	Lease updateLease(int id, Lease newLease);

	// delete a lease
	void deleteLease(int id);

	// link a lease to a property
	void linkLeaseToProperty(int leaseId, int propertyId);

	// link a renter to lease
	void linkRenterToLease(int leaseId, int renterId);

	// get renter by lease
	List<Renter> getRentersByLease(int leaseId);

	// send lease renewal reminders to renters
	void sendLeaseRenewalReminders(int leaseId);

}
