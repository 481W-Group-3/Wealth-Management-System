package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.domain.Lease;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.repositry.LeaseRepository;
import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.repositry.RenterRepository;
import com.wealth_management_system.BackWealthApp.service.RenterService;

@Service
public class RenterServiceImpl implements RenterService{
	
	private RenterRepository renterRepository;
	private PropertyRepositry propertyRepository;
	private LeaseRepository leaseRepository;

	@Override
	public Renter addRenter(Renter renter) {
		// TODO Auto-generated method stub
		return renterRepository.save(renter);
	}

	@Override
	public Renter getRenterById(int id) {
		// TODO Auto-generated method stub
		Optional<Renter> renter = renterRepository.findById(id);
	    return renter.orElse(null); // Return null if not found, or throw a custom exception if preferred
	}

	@Override
	public List<Renter> listAllRenters() {
		// TODO Auto-generated method stub
		return renterRepository.findAll();
	}

	@Override
	public Renter updateRenter(Renter renter) {
		// TODO Auto-generated method stub
		Optional<Renter> existingRenter = renterRepository.findById(renter.getId());
        if (existingRenter.isPresent()) {
            return renterRepository.save(renter); // Update the renter
        }
        return null;
	}

	@Override
	public void deleteRenter(int id) {
		// TODO Auto-generated method stub
		renterRepository.deleteById(id);
		
	}

	@Override
	public List<Property> getPropertiesByRenter(int renterId) {
		// TODO Auto-generated method stub
		//Optional<Renter> renter = renterRepository.findById(renterId);
        //return renter.map(Renter::getProperties).orElse(null); // Return properties or null if not found
		return null;
	}

	@Override
	public void linkRenterToLease(int renterId, int leaseId) {
		// TODO Auto-generated method stub
		Optional<Renter> renterOptional = renterRepository.findById(renterId);
	    Optional<Lease> leaseOptional = leaseRepository.findById(leaseId);

	    if (renterOptional.isPresent() && leaseOptional.isPresent()) {
	        Renter renter = renterOptional.get();
	        Lease lease = leaseOptional.get();

	        // Link the renter to the lease
	        lease.addRenter(renter); // Add the renter to the lease
	        leaseRepository.save(lease); // Save the updated lease

	        // Optionally, you can set the lease in the renter as well
	        renter.setLease(lease);
	        renterRepository.save(renter); // Save the updated renter
	    }
		
	}

}
