package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import java.util.*;

@Entity
@Table(name = "property")
@DataAmount
public class Property {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String address;
	private String city;
	private String state;
	private int zipCode;
	private double taxMonthly;
	private double insuranceMonthly;
	private double mortgageMonthly;
	private String type;
	
	

	public Property() {
		super();
		// TODO Auto-generated constructor stub
	}



	@OneToMany(mappedBy = "property")
	private Set<Renter> renter;
	
	@OneToMany(mappedBy = "property")
    private Set<Lease> leases;
	private double incomeMonthly;
	private double revenue = incomeMonthly-taxMonthly-insuranceMonthly-mortgageMonthly;
	@OneToMany(mappedBy = "property")
    private Set<Maintenance> maintenanceRecords;
	
	

	@ManyToOne
	@JoinColumn(name = "investment_id")
	private Investment investment;
	
	//Constructor
	public Property(String address, String city, String state, int zipCode) {
		this.address = address;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.maintenanceRecords = new HashSet<>();
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
	public int getZipCode() {
		return zipCode;
	}
	
	//Set zip
	public void setZipCode(int zipCode) {
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



	public void addLease(Lease lease) {
		// TODO Auto-generated method stub
		
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


	//Get income
	public double getIncome() {
		return incomeMonthly;
	}
	
	//Set income
	public void setIncome(double incomeMonthly) {
		this.incomeMonthly = incomeMonthly;
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
