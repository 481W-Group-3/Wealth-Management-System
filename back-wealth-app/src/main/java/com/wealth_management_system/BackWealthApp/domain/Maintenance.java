package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import java.util.*;

import org.springframework.data.annotation.Transient;

@Entity
@Table(name = "maintenance")
@DataAmount

public class Maintenance {
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	private String descr;
	private double partsCost;
	private double laborCost;
	private double costTotal = partsCost+laborCost;

	//private Date dateStarted;
	//private Date dateComplete;
	
	@Transient
	 @ManyToOne
	 @JoinColumn(name = "property_id") // Foreign key column
	 private Property property;
	
	//Constructor
	public Maintenance(String descr/*, Date dateStarted*/ ,Property property) {
		this.descr = descr;
		//this.dateStarted = dateStarted;
		//this.property = property;
		this.property = property;
	}

	
	//Get id
	public long getId() {
		return id;
	}
	
	//Set id
	public void setId(long id) {
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
	

	/*
	//Get the property where the work was done
	public Property getProperty() {
		return property;
	}
	
	//Set the property where the work was done
	public void setProperty(Property property) {
		this.property = property;
	}
	*/

}
