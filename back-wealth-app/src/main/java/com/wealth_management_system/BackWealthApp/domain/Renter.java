package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import java.util.*;
import jdk.jfr.DataAmount;

@Entity
@Table(name="renter")
@DataAmount

public class Renter {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private int age;
	private String email;
	private int creditScore;
	private Random random;
	@ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
	@ManyToOne
    @JoinColumn(name = "lease_id") 
    private Lease lease;


	//Constructor
	public Renter(String name, String email) {
		this.id = random.nextInt(100000)+700000;
		this.name = name;
		this.email = email;
	}
	
	//Get id (can we generate this automatically?)
	public int getId() {
		return id;
	}
	
	//Set id (can we generate this automatically?)
	public void setId(int id) {
		this.id = id;
	}
	
	//Get name
	public String getName() {
		return name;
	}
	
	//Set name
	public void setName(String name) {
		this.name = name;
	}
	
	//Get age
	public int getAge() {
		return age;
	}
	
	//Set age
	public void setAge(int age) {
		this.age = age;
	}
	
	//Get email
	public String getEmail() {
		return email;
	}
	
	//Set email
	public void setEmail(String email) {
		this.email = email;
	}
	
	//Get creditScore
	public int getCreditScore() {
		return creditScore;
	}
	
	//Set creditScore
	public void setCreditScore(int creditScore) {
		this.creditScore = creditScore;
	}
	
	public Property getProperty() {
		return property;
	}

	public void setProperty(Property property) {
		this.property = property;
	}

}
