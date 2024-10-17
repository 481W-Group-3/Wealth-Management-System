package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.domain.Property;

public interface InvestmentService {
	
	//add a investment to the list
	Investment addInvestment(Investment investment, String username);
	
	//get an investment detail by id
	Investment getInvestmentById(int id);
	
	//list all the investments made by a user
	List<Investment> listAllInvestments(String username);
	
	//update any investment
	Investment updateInvestment(Investment investment);
	
	//delete any investment
	void deleteInvestment(int id);
	/*
	//link an investment to property
	void linkInvestmentToProperty(int investmentId, int propertyId);
	
	//get the list of properties by id
	List<Property> getPropertiesByInvestment(int investmentId);
	
	//get asset by investment
	List<Asset> getAssetByInvestment(int investmentId);
	*/
	
	// rebalance portfolio
	void rebalancePortfolio(int investmentId);

}
