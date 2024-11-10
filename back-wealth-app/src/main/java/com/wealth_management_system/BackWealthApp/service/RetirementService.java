package com.wealth_management_system.BackWealthApp.service;

import java.util.List;
import java.util.Optional;

import com.wealth_management_system.BackWealthApp.domain.Retirement;

public interface RetirementService {
	
	// Create a new retirement record
    Retirement saveRetirement(Retirement retirement);

    // Retrieve a retirement record by ID
    Optional<Retirement> getRetirementById(int id);

    // Retrieve all retirement records
    List<Retirement> getAllRetirements();

    // Update a retirement record
    Retirement updateRetirement(int id, Retirement retirement);

    // Delete a retirement record by ID
    void deleteRetirement(int id);

    // Calculate years left until retirement
    int calculateYearsToRetirement(int age, int retirementAge);

    // Estimate savings at retirement (example method)
    double estimateRetirementSavings(int currentSavings, int income, int retirementAge, int currentAge);


}
