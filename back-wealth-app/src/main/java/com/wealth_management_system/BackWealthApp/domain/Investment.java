package com.wealth_management_system.BackWealthApp.domain;
import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import java.util.*;

@Entity
@Table(name = "investment")
@DataAmount

public class Investment {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String type;
	private double principalMonthly;
	private double principalYearly;
	private double principalInitial;
	private double currentValue;
	private Date currentDate;
	private Date previousEditDate;
	
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

	
}
