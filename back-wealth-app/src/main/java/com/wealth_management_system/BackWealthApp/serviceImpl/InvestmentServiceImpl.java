package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

//import org.hibernate.mapping.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.InvestmentRepository;
import com.wealth_management_system.BackWealthApp.repositry.UserRepository;
import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.InvestmentService;

@Service
public class InvestmentServiceImpl implements InvestmentService {

	@Autowired
	private InvestmentRepository investmentRepository;

	@Autowired
	private UserRepository userRepository;
	// private Property property;

	@Override
	public Investment addInvestment(Investment investment, String username) {
		double returns = 0;

		// Determine the type of investment
		switch (investment.getType()) {
			case "Stock":
				// Assume these values are provided in the investment object
				returns = calculateStockReturns(investment.getPurchasePrice(), investment.getCurrentValue(),
						investment.getShares(), investment.getAnnualDividend());
				break;
			case "Bond":
				returns = calculateBondReturns(investment.getFaceValue(), investment.getCouponRate(),
						investment.getPricePaid(), investment.getYearsToMaturity());
				break;
			case "Mutual Fund":
				returns = calculateMutualFundReturns(investment.getStartingNAV(), investment.getEndingNAV(),
						investment.getDividends());
				break;
			case "Real Estate":
				returns = calculateRealEstateReturns(investment.getInitialInvestment(), investment.getNetRentalIncome(),
						investment.getNewPropertyValue(), investment.getOriginalPurchasePrice());
				break;
			case "Cryptocurrency":
				returns = calculateCryptoReturns(investment.getPurchasePrice(), investment.getCurrentValue());
				break;
			case "Retirement":
				returns = calculateCryptoReturns(investment.getPurchasePrice(), investment.getCurrentValue());
				break;
			case "CD":
				returns = calculateCryptoReturns(investment.getPurchasePrice(), investment.getCurrentValue());
				break;
			case "Savings":
				returns = calculateCryptoReturns(investment.getPurchasePrice(), investment.getCurrentValue());
				break;

			default:
				// General case if type is unknown
				returns = investment.getCurrentValue() - investment.getPrincipalInitial();
				break;
		}

		investment.setReturns(returns);

		// Find the user
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
		if (existingInvestment.isPresent()) {
			return investmentRepository.save(investment);
		}
		return null;
	}

	@Override
	public void deleteInvestment(int id) {
		investmentRepository.deleteById(id);

	}

	public double calculateStockReturns(double purchasePrice, double sellingPrice, int shares, double annualDividend) {
		double capitalGain = (sellingPrice - purchasePrice) * shares;
		double returnPercentage = ((sellingPrice - purchasePrice) / purchasePrice) * 100;
		double dividendYield = (annualDividend / purchasePrice) * 100;
		return capitalGain + dividendYield; // Return the total stock return
	}

	public double calculateBondReturns(double faceValue, double couponRate, double pricePaid, int yearsToMaturity) {
		double couponPayment = faceValue * couponRate;
		double bondYield = (couponPayment + (faceValue - pricePaid) / yearsToMaturity) / pricePaid * 100;
		return bondYield;
	}

	public double calculateMutualFundReturns(double startingNAV, double endingNAV, double dividends) {
		return ((endingNAV - startingNAV + dividends) / startingNAV) * 100;
	}

	public double calculateRealEstateReturns(double initialInvestment, double netRentalIncome, double newPropertyValue,
			double originalPurchasePrice) {
		double cashOnCashReturn = (netRentalIncome / initialInvestment) * 100;
		double capitalAppreciation = ((newPropertyValue - originalPurchasePrice) / originalPurchasePrice) * 100;
		return cashOnCashReturn + capitalAppreciation;
	}

	public double calculateCryptoReturns(double purchasePrice, double sellingPrice) {
		return ((sellingPrice - purchasePrice) / purchasePrice) * 100;
	}

	public double calculateRetirementAccountReturns(double principal, double rate, int years, int compoundingPeriods) {
		return principal * Math.pow(1 + rate / compoundingPeriods, compoundingPeriods * years);
	}

	public double calculateCDReturns(double principal, double rate, int years, int compoundingPeriods) {
		return principal * Math.pow(1 + rate / compoundingPeriods, compoundingPeriods * years);
	}

	public double calculateSavingsReturns(double principal, double rate, int years, int compoundingPeriods) {
		return principal * Math.pow(1 + rate / compoundingPeriods, compoundingPeriods * years);
	}

	// will be implemented later....
	@Override
	public void rebalancePortfolio(int investmentId) {
		// TODO Auto-generated method stub

	}

}
