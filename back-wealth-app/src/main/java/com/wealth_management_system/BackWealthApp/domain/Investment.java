package com.wealth_management_system.BackWealthApp.domain;
import jakarta.persistence.*;
import jdk.jfr.DataAmount;

import java.time.LocalDate;
import java.util.*;


@Entity
@Table(name = "investment")
@DataAmount

public class Investment {
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String type;
	private double principalMonthly;
	private double principalYearly;
	private double principalInitial;
	private double currentValue;
	private double returns;
	// Additional common fields
    private String description; // Description of the investment
    private LocalDate investmentDate; // Date of investment
    private String investmentName; // Name of the investment or asset
    private double fees; // Management or transaction fees
    
    // Fields specific to Stock
    private double purchasePrice; // Purchase price of stock
    private double annualDividend; // Annual dividend received
    private int shares; // Number of shares owned

    // Fields specific to Bond
    private double faceValue; // Nominal value of bond
    private double couponRate; // Interest rate of bond
    private double pricePaid; // Price paid for the bond
    private int yearsToMaturity; // Years until bond matures

    // Fields specific to Mutual Fund
    private double startingNAV; // Starting Net Asset Value
    private double endingNAV; // Ending Net Asset Value
    private double dividends; // Dividends received

    // Fields specific to Real Estate
    private double initialInvestment; // Amount initially invested
    private double netRentalIncome; // Annual rental income
    private double newPropertyValue; // Current market value of the property
    private double originalPurchasePrice; // Price at which property was purchased

    // Fields specific to Cryptocurrency
    private double currentPrice; // Current market price of the cryptocurrenc
    
    
	

	//private Date currentDate;
	//private Date previousEditDate;
	
	/*
	@OneToMany(mappedBy = "investment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Property> property;
	
	@OneToMany(mappedBy = "investment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Asset> asset;
	*/

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getInvestmentDate() {
		return investmentDate;
	}

	public void setInvestmentDate(LocalDate investmentDate) {
		this.investmentDate = investmentDate;
	}

	public String getInvestmentName() {
		return investmentName;
	}

	public void setInvestmentName(String investmentName) {
		this.investmentName = investmentName;
	}

	public double getFees() {
		return fees;
	}

	public void setFees(double fees) {
		this.fees = fees;
	}

	public double getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public double getAnnualDividend() {
		return annualDividend;
	}

	public void setAnnualDividend(double annualDividend) {
		this.annualDividend = annualDividend;
	}

	public int getShares() {
		return shares;
	}

	public void setShares(int shares) {
		this.shares = shares;
	}

	public double getFaceValue() {
		return faceValue;
	}

	public void setFaceValue(double faceValue) {
		this.faceValue = faceValue;
	}

	public double getCouponRate() {
		return couponRate;
	}

	public void setCouponRate(double couponRate) {
		this.couponRate = couponRate;
	}

	public double getPricePaid() {
		return pricePaid;
	}

	public void setPricePaid(double pricePaid) {
		this.pricePaid = pricePaid;
	}

	public int getYearsToMaturity() {
		return yearsToMaturity;
	}

	public void setYearsToMaturity(int yearsToMaturity) {
		this.yearsToMaturity = yearsToMaturity;
	}

	public double getStartingNAV() {
		return startingNAV;
	}

	public void setStartingNAV(double startingNAV) {
		this.startingNAV = startingNAV;
	}

	public double getEndingNAV() {
		return endingNAV;
	}

	public void setEndingNAV(double endingNAV) {
		this.endingNAV = endingNAV;
	}

	public double getDividends() {
		return dividends;
	}

	public void setDividends(double dividends) {
		this.dividends = dividends;
	}

	public double getInitialInvestment() {
		return initialInvestment;
	}

	public void setInitialInvestment(double initialInvestment) {
		this.initialInvestment = initialInvestment;
	}

	public double getNetRentalIncome() {
		return netRentalIncome;
	}

	public void setNetRentalIncome(double netRentalIncome) {
		this.netRentalIncome = netRentalIncome;
	}

	public double getNewPropertyValue() {
		return newPropertyValue;
	}

	public void setNewPropertyValue(double newPropertyValue) {
		this.newPropertyValue = newPropertyValue;
	}

	public double getOriginalPurchasePrice() {
		return originalPurchasePrice;
	}

	public void setOriginalPurchasePrice(double originalPurchasePrice) {
		this.originalPurchasePrice = originalPurchasePrice;
	}

	public double getCurrentPrice() {
		return currentPrice;
	}

	public void setCurrentPrice(double currentPrice) {
		this.currentPrice = currentPrice;
	}

	@ManyToOne
	@JoinColumn(name = "user_id")
	private MyUser user;
	
	//Constructor for monthly principal
	public Investment(String type, double principalInitial) {
		this.type = type;
		this.principalInitial = principalInitial;
		//this.property = new ArrayList<Property>();
		//this.user = user;
	}

	public Investment() {

	}
	


	public double getReturns() {
		return returns;
	}

	public void setReturns(double returns) {
		this.returns = returns;
	}

	//Get id
	public int getId() {
		return id;
	}
	
	//Set id
	public void setId(int id) {
		this.id = id;
	}
	
	//Get type
	public String getType() {
		return type;
	}
	
	//Set type
	public void setType(String type) {
		this.type = type;
	}
	
	//Get principal monthly
	public double getPrincipalMonthly() {
		return principalMonthly;
	}
	
	//Set principal monthly
	public void setPrincipalMonthly(double principalMonthly) {
		this.principalMonthly = principalMonthly;
	}
	
	//Get principal yearly
	public double getPrincipalYearly() {
		return principalYearly;
	}
	
	//Set principal yearly
	public void setPrincipalYearly(double principalYearly) {
		this.principalYearly = principalYearly;
	}
	
	//Get principal initial
	public double getPrincipalInitial() {
		return principalInitial;
	}
	
	//Set principal initial
	public void setPrincipalInitial(double principalInitial) {
		this.principalInitial = principalInitial;
	}
	
	//Get current value
	public double getCurrentValue() {
		return currentValue;
	}
	
	//Set current value
	public void setCurrentValue(double currentValue) {
		this.currentValue = currentValue;
	}
	
	/*
	//Get current date
	public Date getCurrentDate() {
		return currentDate;
	}
	
	//Set current date
	public void setCurrentDate(Date currentDate) {
		this.currentDate = currentDate;
	}
	
	//Get previous edit date
	public Date getPreviousEditDate() {
		return previousEditDate;
	}
	
	//Set previous edit date
	public void setPreviousEditDate(Date previousEditDate) {
		this.previousEditDate = previousEditDate;
	}
	
	
	*/
	//Get user
	public MyUser getUser() {
		return user;
	}
	
	//Set user
	public void setUser(MyUser user) {
		this.user = user;
	}

	//Get user id
	public int getUserId() {
		return user.getId();
	}

	/*
	public List<Property> getProperty() {
		return property;
	}

	public void setProperty(List<Property> property) {
		this.property = property;
	}

	public Set<Asset> getAsset() {
		return asset;
	}

	public void setAsset(Set<Asset> asset) {
		this.asset = asset;
	}

	*/
	
}
