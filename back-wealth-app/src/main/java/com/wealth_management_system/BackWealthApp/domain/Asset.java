package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import java.util.*;
import java.io.*;


@Entity
@Table(name = "asset")
@DataAmount
public class Asset {
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String type;
	private String descr;
	private double origValue;
	private double currentValue;
	//private Date currentDate;
	//private Investment investment;
	
	/*
	@ManyToOne
    @JoinColumn(name = "investment_id") // Foreign key column
    private Investment investment;
    */
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private MyUser user;
	
	
	
	//Constructor
	public Asset(String type, String descr, double origValue) {
		this.type = type;
		this.descr = descr;
		this.origValue = origValue;
	}

	
	//Get id
	public int id() {
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
	
	//Get desc
	public String getDescr() {
		return descr;
	}
	
	//Set desc
	public void setDescr(String desc) {
		this.descr = desc;
	}
	
	//Get origValue
	public double getOrigValue() {
		return origValue;
	}
	
	//Set origValue
	public void setOrigValue(double origValue) {
		this.origValue = origValue;
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
	//Get investment
	public Investment getInvestment() {
		return investment;
	}
	
	//Set investment
	public void setInvestment(Investment investment) {
		this.investment = investment;
	}
	*/
	
	//Get user id
	public int getUserId() {
		return user.getId();
	}
	
	//Get user 
	public MyUser getUser() {
		return user;
	}
	
	//Set user
	public void setUser(MyUser user) {
		this.user = user;
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
*/
	
	
}
