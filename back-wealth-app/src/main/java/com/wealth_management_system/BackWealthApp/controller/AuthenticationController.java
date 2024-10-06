package com.wealth_management_system.BackWealthApp.controller;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
import com.wealth_management_system.BackWealthApp.security.JwtTokenHelper;
import com.wealth_management_system.BackWealthApp.serviceImpl.UserServiceImpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class AuthenticationController {

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenHelper jwtTokenHelper;
   

    @PostMapping("/register/user")
    public ResponseEntity<String> createUser(@RequestBody MyUser user) {
        System.out.println("Creating Account: ");
        System.out.println(user.getUsername() + " " + user.getPassword() + " " + user.getRole() + " " + user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(userService.createUser(user) == null)
            return new ResponseEntity<>("User Already Exists", HttpStatus.CONFLICT);
        return new ResponseEntity<>("User Created Successfully", HttpStatus.CREATED);
    }

    public String postMethodName(@RequestBody String entity) {
        //TODO: process POST request

        return entity;
    }
    
    @PostMapping("/loginUser")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MyUser myUser) {
        Map<String, Object> response = new HashMap<>();
        System.out.println("Received login request for user: " + myUser.getEmail());

        // Fetch user by email
        MyUser existingUser = userService.getUserByEmail(myUser.getEmail());

        // Check if the user exists and the password matches
        if (existingUser == null || !passwordEncoder.matches(myUser.getPassword(), existingUser.getPassword())) {
            response.put("success", false);
            response.put("message", "Login failed: invalid email or password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        // If authentication is successful, generate the token
        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(existingUser.getUsername(), myUser.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT token
            String token = jwtTokenHelper.generateToken((UserDetails) authentication.getPrincipal());
            System.out.println("Token in the login funcion is: " + token);

            // Construct response
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", token);  // Include JWT token in response
            response.put("user", existingUser);
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            response.put("success", false);
            response.put("message", "Login failed: bad credentials.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Authentication failed due to internal error.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
/*
    
    @PostMapping("/loginUser")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MyUser myUser) {
        Map<String, Object> response = new HashMap<>();
        System.out.println("Received login request for user: " + myUser.getEmail());

        MyUser existingUser = userService.getUserByEmail(myUser.getEmail());

        if (existingUser == null || !passwordEncoder.matches(myUser.getPassword(), existingUser.getPassword())) {
            response.put("success", false);
            response.put("message", "Login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(existingUser.getUsername(), myUser.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate the JWT Token
            String token = jwtTokenHelper.generateToken(authentication);

            // Return the response with the token
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", token); // Add the JWT token to the response
            response.put("user", existingUser);
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            response.put("success", false);
            response.put("message", "Login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Authentication failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /*

    @PostMapping("/loginUser")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MyUser myUser) {
        Map<String, Object> response = new HashMap<>();
        System.out.println("Received login request for user: " + myUser.getEmail());

        MyUser existingUser = userService.getUserByEmail(myUser.getEmail());

        if (existingUser == null || !passwordEncoder.matches(myUser.getPassword(), existingUser.getPassword())) {
            response.put("success", false);
            response.put("message", "Login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(existingUser.getUsername(), myUser.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", existingUser);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            response.put("success", false);
            response.put("message", "Login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Authentication failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
*/
//    @GetMapping("/retrieve/user")
//    public MyUser retrieveUser(@RequestParam("username") String username) {
//        return userService.getUserByUsername(username);
//    }
    }


//    @GetMapping("/retrieve/user")
//    public MyUser retrieveUser(@RequestParam("username") String username) {
//        return userService.getUserByUsername(username);
//    }

