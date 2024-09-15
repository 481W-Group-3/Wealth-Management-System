package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

//import org.hibernate.mapping.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.InvestmentRepository;
import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.service.InvestmentService;

@Service
public class InvestmentServiceImpl implements InvestmentService {
	private final InvestmentRepository investmentRepository;
	
	public InvestmentServiceImpl(InvestmentRepository investmentRepository) {
		this.investmentRepository = investmentRepository;
	}

	@Override
	public Investment addInvestment(Investment investment) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Investment getInvestmentById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Investment> listAllInvestments() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Investment updateInvestment(Investment investment) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteInvestment(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void linkInvestmentToProperty(int investmentId, int propertyId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Property> getPropertiesByInvestment(int investmentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Asset getAssetByInvestment(int investmentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void rebalancePortfolio(int investmentId) {
		// TODO Auto-generated method stub
		
	}

}
