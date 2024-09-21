package com.wealth_management_system.BackWealthApp.controller;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
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


    @PostMapping("/register/user")
    public MyUser createUser(@RequestBody MyUser user) {
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        System.out.println(user.getRole());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.createUser(user);
    }



public String postMethodName(@RequestBody String entity) {
    //TODO: process POST request
    
    return entity;
}




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

//    @GetMapping("/retrieve/user")
//    public MyUser retrieveUser(@RequestParam("username") String username) {
//        return userService.getUserByUsername(username);
//    }
}







































//    @GetMapping("/retrieve/user")
//    public MyUser retrieveUser(@RequestParam("username") String username) {
//        return userService.getUserByUsername(username);
//    }
}
