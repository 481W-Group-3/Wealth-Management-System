package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.domain.Retirement;
import com.wealth_management_system.BackWealthApp.repositry.RetirementRepository;
import com.wealth_management_system.BackWealthApp.service.RetirementService;

@Service
public class RetirementServiceImpl implements RetirementService{

	private final RetirementRepository retirementRepository;

    @Autowired
    public RetirementServiceImpl(RetirementRepository retirementRepository) {
        this.retirementRepository = retirementRepository;
    }

    @Override
    public Retirement saveRetirement(Retirement retirement) {
        return retirementRepository.save(retirement);
    }

    @Override
    public Optional<Retirement> getRetirementById(int id) {
        return retirementRepository.findById(id);
    }

    @Override
    public List<Retirement> getAllRetirements() {
        return retirementRepository.findAll();
    }

    @Override
    public Retirement updateRetirement(int id, Retirement updatedRetirement) {
        return retirementRepository.findById(id).map(existingRetirement -> {
            existingRetirement.setAge(updatedRetirement.getAge());
            existingRetirement.setRetirement_age(updatedRetirement.getRetirement_age());
            existingRetirement.setLife_expectancy(updatedRetirement.getLife_expectancy());
            existingRetirement.setIncome(updatedRetirement.getIncome());
            existingRetirement.setRetirement_expenses(updatedRetirement.getRetirement_expenses());
            existingRetirement.setCurrent_savings(updatedRetirement.getCurrent_savings());
            return retirementRepository.save(existingRetirement);
        }).orElseThrow(() -> new RuntimeException("Retirement record not found"));
    }

    @Override
    public void deleteRetirement(int id) {
        retirementRepository.deleteById(id);
    }

    @Override
    public int calculateYearsToRetirement(int age, int retirementAge) {
        return Math.max(0, retirementAge - age);
    }

    @Override
    public double estimateRetirementSavings(int currentSavings, int income, int retirementAge, int currentAge) {
        int yearsToRetirement = calculateYearsToRetirement(currentAge, retirementAge);
        double estimatedSavings = currentSavings + (income * yearsToRetirement);
        return estimatedSavings;
    }

}
