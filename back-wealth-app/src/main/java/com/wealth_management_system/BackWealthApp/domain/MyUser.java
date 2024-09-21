package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name="user")
public class MyUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String role;
    private String email;

    public MyUser(){
    }

    public MyUser(String username, String password, String role, String email) {
        this.username = username;
        this.password = password;
        this.email=email;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
    	return List.of(new SimpleGrantedAuthority(role));
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;  // For now, returning true (can customize logic)
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Can be customized based on user status
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Same as above
    }

    @Override
    public boolean isEnabled() {
        return true;  // You can use this to enable/disable users
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}

