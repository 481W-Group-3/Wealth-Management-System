package com.wealth_management_system.BackWealthApp.security;

import lombok.Data;

@Data
public class JwtAuthRequest {
	
	private String username;
	
	private String password;

}
