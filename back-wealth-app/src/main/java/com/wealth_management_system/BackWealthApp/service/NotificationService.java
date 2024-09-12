package com.wealth_management_system.BackWealthApp.service;

public interface NotificationService {
	
	//send lease renewal reminder to renter
	void sendLeaseRenewalReminder(int leaseId);
	
	//send a payment reminder to renter
	void sendPaymentReminder(int userId);
	
	//send any new market prediction update to user
	void sendMarketPredictionUpdate(int userId);
	
	//send any event notification to user
	void sendEventNotification(int userId, String eventDetails);

}
