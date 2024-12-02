package com.wealth_management_system.BackWealthApp.domain;

import java.sql.Date;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "lease")
public class Lease {
	
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String tenantName;  // Added tenant name
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date startDate;     // Added start date

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private Date endDate;     // Added end date

	private double paymentMonthly;


    @Column(name = "rent_due_day", nullable = false)
    private int rentDueDay;
    
	@JsonBackReference
    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    // Constructor
    public Lease(String tenantName, Date startDate, Date endDate, double paymentMonthly, int rentDueDay) {
        this.tenantName = tenantName;
        this.startDate = startDate;
        this.endDate = endDate;
		this.paymentMonthly = paymentMonthly;
        this.rentDueDay = rentDueDay;
    }

	public Lease() {

	}

    // Getters and Setters
    public int getId() {
        return id;
    }

    public String getTenantName() {
        return tenantName;
    }

    public void setTenantName(String tenantName) {
        this.tenantName = tenantName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
	
	
	//Get property
	public Property getProperty() {
		return property;
	}
	
	//Set property
	public void setProperty(Property property) {
		this.property = property;
	}
	

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getrentDueDay() {
        return rentDueDay;
    }

    public void setrentDueDay(int rentDueDay) {
        this.rentDueDay = rentDueDay;
    }

	public double getPaymentMonthly() {
        return paymentMonthly;
    }

    public void setPaymentMonthly(double paymentMonthly) {
        this.paymentMonthly = paymentMonthly;
    }

    public void addRenter(Renter renter) {
    }
	/*
	public void addRenter(Renter renter) {
		renters.add(renter);
		renter.setLease(this);
		
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

	// public void addRenter(Renter renter) {
	// 	// TODO Auto-generated method stub
		
	// }


}
