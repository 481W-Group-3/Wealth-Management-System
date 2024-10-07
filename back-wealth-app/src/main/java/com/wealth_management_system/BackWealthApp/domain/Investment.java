package com.wealth_management_system.BackWealthApp.domain;
import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import java.util.*;


@Entity
@Table(name = "investment")
@DataAmount

public class Investment {
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String type;
	private double principalMonthly;
	private double principalYearly;
	private double principalInitial;
	private double currentValue;
	private double returns;
	

	//private Date currentDate;
	//private Date previousEditDate;
	
	@OneToMany(mappedBy = "investment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Property> property;
	
	@OneToMany(mappedBy = "investment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Asset> asset;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private MyUser user;
	
	//Constructor for monthly principal
	public Investment(String type, double principalInitial) {
		this.type = type;
		this.principalInitial = principalInitial;
		this.property = new ArrayList<Property>();
	}

	public Investment() {

	}
	


	public double getReturns() {
		return returns;
	}

	public void setReturns(double returns) {
		this.returns = returns;
	}

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
	
	/*
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
	
	
	*/
	//Get user
	public MyUser getUser() {
		return user;
	}
	
	//Set user
	public void setUser(MyUser user) {
		this.user = user;
	}

	

	public List<Property> getProperty() {
		return property;
	}

	public void setProperty(List<Property> property) {
		this.property = property;
	}

	public Set<Asset> getAsset() {
		return asset;
	}

	public void setAsset(Set<Asset> asset) {
		this.asset = asset;
	}

	
}
