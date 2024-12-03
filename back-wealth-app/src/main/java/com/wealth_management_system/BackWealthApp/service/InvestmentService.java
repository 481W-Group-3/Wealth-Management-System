package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.Investment;

public interface InvestmentService {

	// add a investment to the list
	Investment addInvestment(Investment investment, String username);

	// get an investment detail by id
	Investment getInvestmentById(int id);

	// list all the investments made by a user
	List<Investment> listAllInvestments(String username);

	// update any investment
	Investment updateInvestment(Investment investment);

	// delete any investment
	void deleteInvestment(int id);

	double calculateStockReturns(double purchasePrice, double sellingPrice, int shares, double annualDividend);

	double calculateBondReturns(double faceValue, double couponRate, double pricePaid, int yearsToMaturity);

	double calculateMutualFundReturns(double startingNAV, double endingNAV, double dividends);

	double calculateRealEstateReturns(double initialInvestment, double netRentalIncome, double newPropertyValue,
			double originalPurchasePrice);

	double calculateCryptoReturns(double purchasePrice, double sellingPrice);

	double calculateRetirementAccountReturns(double principal, double rate, int years, int compoundingPeriods);

	double calculateCDReturns(double principal, double rate, int years, int compoundingPeriods);

	double calculateSavingsReturns(double principal, double rate, int years, int compoundingPeriods);

	// rebalance portfolio
	void rebalancePortfolio(int investmentId);

}
