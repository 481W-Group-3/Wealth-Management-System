package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import java.util.*;
import jdk.jfr.DataAmount;

@Entity
@Table(name="admin")
@DataAmount

public class Admin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String email;
	private String password;
	private Random random;
	
	//Constructor
	public Admin(String email, String password) {
		this.id = random.nextInt(100000)+900000;
		this.email = email;
		this.password = password;
	}
	
	//Get id
	public int getId() {
		return id;
	}
	
	//Set id
	public void setId(int id) {
		this.id = id;
	}
	
	//Get email
	public String getEmail() {
		return email;
	}
	
	//Set email
	public void setEmail(String email) {
		this.email = email;
	}
	
	//Get password
	public String getPassword() {
		return password;
	}
	
	//Set password
	public void setPassword(String password) {
		this.password = password;
	}

}
