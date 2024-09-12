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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String type;
	private String desc;
	private double origValue;
	private double currentValue;
	private Date currentDate;
	
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
	public String getDesc() {
		return desc;
	}
	
	//Set desc
	public void setDesc(String desc) {
		this.desc = desc;
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
	
	//Get current date
	public Date getCurrentDate() {
		return currentDate;
	}
	
	//Set current date
	public void setCurrentDate(Date currentDate) {
		this.currentDate = currentDate;
	}
	
	
}
