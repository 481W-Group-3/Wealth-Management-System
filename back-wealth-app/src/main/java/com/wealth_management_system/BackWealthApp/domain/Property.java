package com.wealth_management_system.BackWealthApp.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jdk.jfr.DataAmount;

@Entity
@Table(name = "property")
@DataAmount
public class Property {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String address;
	private double incomeMonthly;
	private double propertyValue;
	private String city;
	private String state;
	private String zipCode;
	private String county;
	private double taxMonthly;
	private double insuranceMonthly;
	private double mortgageMonthly;
	private String type;
	private boolean occupied;
	

	public Property() {
		super();
		// TODO Auto-generated constructor stub
	}

	@OneToMany(mappedBy = "property")
	private Set<Renter> renter;
	
	//delete maintenance records and leases attached to property
	@OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Lease> leases = new ArrayList<>();
	private double revenue = incomeMonthly-taxMonthly-insuranceMonthly-mortgageMonthly;
	@OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Maintenance> maintenanceRecords = new ArrayList<>();
	
	/*
	@ManyToOne
	@JoinColumn(name = "investment_id")
	private Investment investment;
	*/
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({"properties", "authorities", "password"}) 
	private MyUser user;
	
	//Constructor
	public Property(double propertyValue, String address, String city, String state, String county, String zipCode, boolean occupied, double incomeMonthly) {
		this.propertyValue = propertyValue;
		this.address = address;
		this.occupied = occupied;
		this.incomeMonthly = incomeMonthly;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.county = county;
		this.maintenanceRecords = new ArrayList<>();
	}


	//Get id
	public int getId() {
		return id;
	}
	
	//Set id
	public void setId(int id) {
		this.id = id;
	}
	
	//Get address
	public String getAddress() {
		return address;
	}
	
	//Set address
	public void setAddress(String address) {
		this.address = address;
	}
	
	//Get city
	public String getCity() {
		return city;
	}
	
	//Set city
	public void setCity(String city) {
		this.city = city;
	}
	
	//Get state
	public String getState() {
		return state;
	}
	
	//Set state
	public void setState(String state) {
		this.state = state;
	}
	
	//Get zip
	public String getZipCode() {
		return zipCode;
	}
	
	//Set zip
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	
	//Get tax
	public double getTax() {
		return taxMonthly;
	}
	
	//Set tax
	public void setTax(double taxMonthly) {
		this.taxMonthly = taxMonthly;
	}
	
	//Get insurance
	public double getInsurance() {
		return insuranceMonthly;
	}
	
	//Set insurance
	public void setInsurance(double insuranceMonthly) {
		this.insuranceMonthly = insuranceMonthly;
	}
	
	//Get mortgage
	public double getMortgage() {
		return mortgageMonthly;
	}
	
	//Set mortgage
	public void setMortgage(double mortgageMonthly) {
		this.mortgageMonthly = mortgageMonthly;
	}
	
	//Get type
	public String getType() {
		return type;
	}
	
	//Set type
	public void setType(String type) {
		this.type = type;
	}
	
	// Method to add a renter
    public void addRenter(Renter renter2) {
        renter.add(renter2);
        ((Renter) renter).setProperty(this); // Set property reference in renter
    }
    
    //Get user id
    public int getUserId() {
    	return user.getId();
    }

    //Get user
    public MyUser getUser() {
    	return user;
    }
    
    //Set user
    public void setUser(MyUser user) {
    	this.user = user;
    }

	public void addLease(Lease lease) {
		// TODO Auto-generated method stub
		leases.add(lease);	
	}
	
	public List<Lease> getLeases(){
		return leases;
	}

	public double getRevenue() {
		return revenue;
	}
	
	public void setRevenue(double revenue) {
		this.revenue = revenue;
	}

	//Get income
	public double getIncomeMonthly() {
		return incomeMonthly;
	}
	
	//Set income
	public void setIncomeMonthly(double incomeMonthly) {
		this.incomeMonthly = incomeMonthly;
	}

	//Get occupied
	public boolean getOccupied() {
		return occupied;
	}
	
	//Set income
	public void setOccupied(boolean occupied) {
		this.occupied = occupied;
	}

    public double getPropertyValue() {
        return propertyValue;
    }

    public void setPropertyValue(double propertyValue) {
        this.propertyValue = propertyValue;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

	/*
	//Get renter
	public Renter getRenter() {
		return renter;
	}
	
	//Set renter
	public void setRenter(Renter renter) {
		this.renter = renter;
	}
	*/
	/*
	//Get lease
	public Lease getLease() {
		return lease;
	}
	
	//Set lease
	public void setLease(Lease lease) {
		this.lease = lease;
	}
	
	
	public Set<Lease> getLeases() {
		return leases;
	}

	public void setLeases(Set<Lease> leases) {
		this.leases = leases;
	}
	
	//Get revenue
	public double getRevenue() {
		return revenue;
	}

	public Investment getInvestment() {
		return investment;
	}

	public void setInvestment(Investment investment) {
		this.investment = investment;
	}

	public Set<Renter> getRenter() {
		return renter;
	}

	public void setRenter(Set<Renter> renter) {
		this.renter = renter;
	}
	
	public Set<Maintenance> getMaintenanceRecords() {
		return maintenanceRecords;
	}


	public void setMaintenanceRecords(Set<Maintenance> maintenanceRecords) {
		this.maintenanceRecords = maintenanceRecords;
	}



	public void addLease(Lease lease) {
		if (leases == null) {
	        leases = new HashSet<>();
	    }
	    leases.add(lease);
	    lease.setProperty(this);
	}



	public double calculateRevenue() {
		return incomeMonthly - (taxMonthly + insuranceMonthly + mortgageMonthly);
	}



	
	
	//The revenue is set when the mortgage, insurance, tax, and income are set

	/*
	//Get the maintenance list
	public ArrayList<Maintenance> getMaintenance(){
		return maintenance;
	}
	*/


}
