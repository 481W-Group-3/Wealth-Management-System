package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import java.util.*;
import jdk.jfr.DataAmount;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name="user")
@DataAmount
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String username;
    private String password;
    private String firstName;
    private String message;

    private String email;
    @OneToMany(mappedBy = "user")
    private ArrayList<Investment> investment;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        firstName = "firstName";
        message = "message";
        this.investment = new ArrayList<Investment>();
    }


    public User(){
        username = "backend";
        password = "password";
        firstName = "firstName";
        message = "message";
    }
    
 

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    

    public ArrayList<Investment> getInvestment(){
    	return investment;
    }
    
    public void setInvestment(ArrayList<Investment> investment) {
    	this.investment = investment;
    }

}

