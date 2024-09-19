package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import java.util.*;

@Entity
@Table(name = "maintenance")
@DataAmount

public class Maintenance {
	private int id;
	private String desc;
	private double partsCost;
	private double laborCost;
	private double costTotal = partsCost+laborCost;
	private Date dateStarted;
	private Date dateComplete;
	private Property property;
	private Random random;
	
	//Constructor
	public Maintenance(String desc, Date dateStarted, Property property) {
		this.id = random.nextInt(100000)+500000;
		this.desc = desc;
		this.dateStarted = dateStarted;
		this.property = property;
		property.getMaintenance().add(this);
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
	public String getDesc() {
		return desc;
	}
	
	//Set description
	public void setDesc(String desc) {
		this.desc = desc;
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
	
	//Get the property where the work was done
	public Property getProperty() {
		return property;
	}
	
	//Set the property where the work was done
	public void setProperty(Property property) {
		this.property = property;
	}

}
