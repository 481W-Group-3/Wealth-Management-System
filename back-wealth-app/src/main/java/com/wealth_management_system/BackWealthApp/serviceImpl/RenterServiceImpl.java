package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.domain.Lease;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.repositry.LeaseRepository;
import com.wealth_management_system.BackWealthApp.repositry.RenterRepository;
import com.wealth_management_system.BackWealthApp.service.RenterService;

@Service
public class RenterServiceImpl implements RenterService {

	private RenterRepository renterRepository;
	private LeaseRepository leaseRpository;

	@Override
	public Renter addRenter(Renter renter) {
		return renterRepository.save(renter);
	}

	@Override
	public Renter getRenterById(int id) {
		Optional<Renter> renter = renterRepository.findById(id);
		return renter.orElse(null);
	}

	@Override
	public List<Renter> listAllRenters() {
		return renterRepository.findAll();
	}

	@Override
	public Renter updateRenter(Renter renter) {
		Optional<Renter> existingRenter = renterRepository.findById(renter.getId());
		if (existingRenter.isPresent()) {
			return renterRepository.save(renter);
		}
		return null;
	}

	@Override
	public void deleteRenter(int id) {
		renterRepository.deleteById(id);

	}

	@Override
	public List<Property> getPropertiesByRenter(int renterId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void linkRenterToLease(int renterId, int leaseId) {
		Optional<Renter> renterOptional = renterRepository.findById(renterId);
		Optional<Lease> leaseOptional = leaseRpository.findById(leaseId);

		if (renterOptional.isPresent() && leaseOptional.isPresent()) {
			Renter renter = renterOptional.get();
			Lease lease = leaseOptional.get();

			lease.addRenter(renter);
			leaseRpository.save(lease);

			renter.setLease(lease);
			renterRepository.save(renter);
		}

	}

}
