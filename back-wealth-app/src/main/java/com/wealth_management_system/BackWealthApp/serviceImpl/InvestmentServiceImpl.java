package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.security.Principal;
import java.util.*;

//import org.hibernate.mapping.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.InvestmentRepository;
import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.service.InvestmentService;

@Service
public class InvestmentServiceImpl implements InvestmentService {
	
	@Autowired
	private InvestmentRepository investmentRepository;
	
	@Autowired
	private UserRepositry userRepository;
	//private Property property;
	
	@Override
	public Investment addInvestment(Investment investment, String username) {
        // Calculate the returns
        double returns = investment.getCurrentValue() - investment.getPrincipalInitial();
        investment.setReturns(returns);
        
        //Find the user
        MyUser user = userRepository.findMyUserByUsername(username);
        investment.setUser(user);

        // Save investment with calculated returns
        return investmentRepository.save(investment);
    }

	@Override
	public Investment getInvestmentById(int id) {
		Optional<Investment> investment = investmentRepository.findById(id);
		return investment.orElse(null);
	}

	@Override
	public List<Investment> listAllInvestments(String username) {
		MyUser user = userRepository.findMyUserByUsername(username);
		return investmentRepository.findByUser(user);
	}

	@Override
	public Investment updateInvestment(Investment investment) {
		Optional<Investment> existingInvestment = investmentRepository.findById(investment.getId());
		if(existingInvestment.isPresent()) {
			return investmentRepository.save(investment);
		}
		return null;
	}

	@Override
	public void deleteInvestment(int id) {
		investmentRepository.deleteById(id);
		
	}
/*
	@Override
	public void linkInvestmentToProperty(int investmentId, int propertyId) {
		Optional<Investment> investmentOpt = investmentRepository.findById(investmentId);
        if (investmentOpt.isPresent()) {
            Investment investment = investmentOpt.get();
            
            property.setId(propertyId);
            investment.getProperty().add(property); 
            investmentRepository.save(investment);
        } else {
            throw new RuntimeException("Investment not found");
        }
		
	}

	@Override
	public List<Property> getPropertiesByInvestment(int investmentId) {
		Optional<Investment> investmentOpt = investmentRepository.findById(investmentId);
        if (investmentOpt.isPresent()) {
            Investment investment = investmentOpt.get();
            return new ArrayList<>(investment.getProperty()); // Convert to List
        }
        return Collections.emptyList();
	}

	@Override
	public List<Asset> getAssetByInvestment(int investmentId) {
		Optional<Investment> investmentOpt = investmentRepository.findById(investmentId);
	    if (investmentOpt.isPresent()) {
	        Investment investment = investmentOpt.get();
	        return new ArrayList<>(investment.getAsset()); // Convert Set to List
	    }
	    return Collections.emptyList();
	}
	*/

	//will be implemented later....d
	@Override
	public void rebalancePortfolio(int investmentId) {
		// TODO Auto-generated method stub
		
	}

}
