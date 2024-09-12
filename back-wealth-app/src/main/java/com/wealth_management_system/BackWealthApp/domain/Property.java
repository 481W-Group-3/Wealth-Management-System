package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import java.util.*;

@Entity
@Table(name = "property")
@DataAmount
public class Property {
	private int id;
	private String address;
	private String city;
	private String state;
	private int zipCode;
	private double taxMonthly;
	private double insuranceMonthly;
	private double mortgageMonthly;
	private String type;
	private Renter renter;
	private Lease lease;
	private double incomeMonthly;
	private double revenue = incomeMonthly-taxMonthly-insuranceMonthly-mortgageMonthly;
	private ArrayList<Maintenance> maintenance;
	private Random random;
	
	//Constructor
	public Property(String address, String city, String state, int zipCode) {
		this.id = random.nextInt(100000)+600000;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.maintenance = new ArrayList<Maintenance>();
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
	
	//Get renter
	public Renter getRenter() {
		return renter;
	}
	
	//Set renter
	public void setRenter(Renter renter) {
		this.renter = renter;
	}
	
	//Get lease
	public Lease getLease() {
		return lease;
	}
	
	//Set lease
	public void setLease(Lease lease) {
		this.lease = lease;
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
	
	//The revenue is set when the mortgage, insurance, tax, and income are set
	
	//Get the maintenance list
	public ArrayList<Maintenance> getMaintenance(){
		return maintenance;
	}

}