package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import java.util.*;
import jdk.jfr.DataAmount;

@Entity
@Table(name="admin")
@DataAmount

public class Admin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	private String email;
	private String password;
	
	//Get id
	public long getId() {
		return id;
	}
	
	//Set id
	public void setId(long id) {
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
