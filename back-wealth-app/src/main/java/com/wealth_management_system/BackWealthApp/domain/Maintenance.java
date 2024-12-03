package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jdk.jfr.DataAmount;

@Entity
@Table(name = "maintenance")
@DataAmount

public class Maintenance {
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String descr;
	private double partsCost;
	private double laborCost;
	private double costTotal;

	//private Date dateStarted;
	//private Date dateComplete;
	
	
	 @ManyToOne
	 @JoinColumn(name = "property_id") // Foreign key column
	 private Property property;

	//Constructor
	public Maintenance(String descr) {
		this.descr = descr;
		//this.dateStarted = dateStarted;
		//this.property = property;
	}

	public Maintenance() {
		this.descr = "no argument constructor";
		this.property = null;
	}
	
	//Get id
	public int getId() {
		return id;
	}
	
	//Set id
	public void setId(int id) {
		this.id = id;
	}
	
	//Get description
	public String getDescr() {
		return descr;
	}
	
	//Set description
	public void setDesc(String desc) {
		this.descr = desc;
	}
	
	//Get parts cost
	public double getPartsCost() {
		return partsCost;
	}
	
	//Set parts cost
	public void setPartsCost(double partsCost) {
		this.partsCost = partsCost;
	}
	
	//Get labor cost
	public double getLaberCost() {
		return laborCost;
	}
	
	//Set labor cost
	public void setLaborCost(double laborCost) {
		this.laborCost = laborCost;
	}
	
	//Get total cost
	public double getCostTotal() {
		return costTotal;
	}
	
	//Set total cost
	public void setCostTotal(double costTotal) {
		this.costTotal = costTotal;
	}
	
	public Property getProperty() {
		return property;
	}

	public void setProperty(Property property) {
		this.property = property;
	}

	
	
	
/*	
	//Get the start date
	public Date getDateStarted() {
		return dateStarted;
	}
	
	//Set the start date
	public void setDateStarted(Date dateStarted) {
		this.dateStarted = dateStarted;
	}
	
	//Get the date of completion
	public Date getDateComplete() {
		return dateComplete;
	}
	
	//Set the date of completion
	public void setDateComplete(Date dateComplete) {
		this.dateComplete = dateComplete;
	}
	*/

}
