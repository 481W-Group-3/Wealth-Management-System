package com.wealth_management_system.BackWealthApp.service;

public interface TaxService {
	
	//send details to tax software
	void exportToTaxSoftware(int userId);
	
	//track the filing status
	void trackTaxFilingStatus(int userId);
	
	//get all statuses
	//List<TaxFilingStatus> getUserTaxFilingStatuses(int userId);
	
	//update status
	//void updateTaxFilingStatus(int userId, TaxFilingStatus status);

}
