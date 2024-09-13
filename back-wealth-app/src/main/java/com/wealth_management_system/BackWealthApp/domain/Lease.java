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
	private Date startDate;
	private Date endDate;
	private double paymentMonthly;
	private int rentDueDay;
	private double securityDeposit;
	private File document;
	
	//Get id
	public int getId() {
		return id;
	}
	
	//Set id
	public void setId(int id) {
		this.id = id;
	}
	
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
	
	//Get payment monthly
	public double getPaymentMonthly() {
		return paymentMonthly;
	}
	
	//Set payment monthly
	public void setPaymentMonthly(double paymentMonthly) {
		this.paymentMonthly = paymentMonthly;
	}
	
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
	
	//Get the lease document
	public File getDocument() {
		return document;
	}
	
	//Set the lease document
	public void setDocument(File document) {
		this.document = document;
	}
	
}
