package com.wealth_management_system.BackWealthApp.security;

import java.io.IOException;
import java.nio.charset.MalformedInputException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.wealth_management_system.BackWealthApp.serviceImpl.UserServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	@Lazy
	private UserServiceImpl userServiceImpl;
	
	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String requestToken = request.getHeader("Authorization");
		
		System.out.println(requestToken);
		
		String username = null;
		
		String token = null;
		System.out.println("token is: " + requestToken);
		//System.out.println("username is: " + this.jwtTokenHelper.getUsernameFromToken(token));
		
		if(requestToken!=null && requestToken.startsWith("Bearer ")) {
			token = requestToken.substring(7);
			try {
			username = this.jwtTokenHelper.getUsernameFromToken(token);
			System.out.println("Extracted username: " + username);
			}catch(IllegalArgumentException e) {
				System.out.println("Unable to get Jwt token");
			}catch(ExpiredJwtException e) {
				System.out.println("Token expired");
			}catch(MalformedJwtException e) {
				System.out.println("invalid jwt");
			}
			
		}else {
			System.out.println("Token does not begin with bearer");
		}
		
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
		    UserDetails userDetails = this.userServiceImpl.loadUserByUsername(username);

		    // Log userDetails for debugging
		    System.out.println("UserDetails: " + userDetails);

		    if (this.jwtTokenHelper.validateToken(token, userDetails)) {
		        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
		                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
		        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource());
		        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
		        System.out.println("User authenticated successfully.");
		    } else {
		        System.out.println("Invalid JWT token.");
		    }
		} else {
		    System.out.println("Username is null or context is not null");
		}
		filterChain.doFilter(request, response);
	}

}
