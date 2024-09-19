package com.wealth_management_system.BackWealthApp.controller;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
import com.wealth_management_system.BackWealthApp.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthenticationController {

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register/user")
    public MyUser createUser(@RequestBody MyUser user) {
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        System.out.println(user.getRole());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.createUser(user);
    }

//    @GetMapping("/retrieve/user")
//    public MyUser retrieveUser(@RequestParam("username") String username) {
//        return userService.getUserByUsername(username);
//    }
}
