package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import java.util.*;
import java.io.*;


@Entity
@Table(name = "lease")
@DataAmount
public class Lease {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	//private Date startDate;
	//private Date endDate;
	private String leaseType;
	private double paymentMonthly;
	
	
	 @OneToMany(mappedBy = "lease")
	private Set<Renter> renters;
	
	private int rentDueDay;
	private double securityDeposit;
	@ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
	//private File document;
	@Transient
	private Random random;
	
	//Constructor
	public Lease() {
		this.random = new Random();
        this.id = random.nextInt(100000) + 400000;
		//this.property = property;
		//this.startDate = startDate;
		//this.endDate = endDate;
		//this.renter = new ArrayList<Renter>();
	}
	
	//Get id
	public int getId() {
		return id;
	}
	
	//Set id
	public void setId(int id) {
		this.id = id;
	}
	
	public String getLeaseType() {
        return leaseType;
    }

    public void setLeaseType(String leaseType) {
        this.leaseType = leaseType;
    }
	
    /*
	//Get start date
	public Date getStartDate() {
		return startDate;
	}
	
	//Set start date
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
	//Get end date
	public Date getEndDate() {
		return endDate;
	}
	
	//Set end date
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	*/
	//Get payment monthly
	public double getPaymentMonthly() {
		return paymentMonthly;
	}
	
	//Set payment monthly
	public void setPaymentMonthly(double paymentMonthly) {
		this.paymentMonthly = paymentMonthly;
	}
	
	/*
	//Get renter
	public ArrayList<Renter> getRenter() {
		return renter;
	}
	
	//Set renter
	public void setRenter(ArrayList<Renter> renter) {
		this.renter = renter;
	}
	
	//Get property
	public Property getProperty() {
		return property;
	}
	
	//Set property
	public void setProperty(Property property) {
		this.property = property;
	}
	*/
	
	//Get rent due day
	public int getRentDueDay() {
		return rentDueDay;
	}
	
	//Set rent due day
	public void setRentDueDay(int rentDueDay) {
		this.rentDueDay = rentDueDay;
	}
	
	//Get security deposit
	public double getSecurityDeposit() {
		return securityDeposit;
	}
	
	//Set security deposit
	public void setSecurityDeposit(double securityDeposit) {
		this.securityDeposit = securityDeposit;
	}

	public Property getProperty() {
		return property;
	}

	public void setProperty(Property property) {
		this.property = property;
	}
	
	/*
	//Get the lease document
	public File getDocument() {
		return document;
	}
	
	//Set the lease document
	public void setDocument(File document) {
		this.document = document;
	}*/
	
}
