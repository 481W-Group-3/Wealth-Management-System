package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity
@Table(name = "user")
public class MyUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String password;
    private String role;
    private String email;
    
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Property> properties;
    
    /*
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Asset> assets;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Investment> investments;
    */

    public MyUser() {
        this.role = "USER";
    }

    public MyUser(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.role = "USER";
        this.email = email;
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
//        return List.of(new SimpleGrantedAuthority(role));
        return Stream.of(role.split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
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

    public List<String> getRoles() {
        return Stream.of(role.split(",")).collect(Collectors.toList());
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isAdmin() {
        List<String> roles = getRoles();
        if(roles.contains("ADMIN"))
            return true;
        return false;
    }

    public void addRole(String role){
        this.role = this.role + "," + role;
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

    public String toString(){
        return id + " " + username + " " + email;
    }
    
    /*
    public List<Property> getProperties(){
    	return properties;
    }
    
    public void setProperties(List<Property> properties) {
    	this.properties = properties;
    }
    
    public List<Investment> getInvestments(){
    	return investments;
    }
    
    public void setInvestments(List<Investment> investments) {
    	this.investments = investments;
    }
    
    public List<Asset> getAssets(){
    	return assets;
    }
    
    public void setAssets(List<Asset> assets) {
    	this.assets = assets;
    }
    */

}

