package com.wealth_management_system.BackWealthApp;

import com.wealth_management_system.BackWealthApp.controller.AuthenticationController;
import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackWealthAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackWealthAppApplication.class, args);


        System.out.println("********************************");

        System.out.println("********************************");

//        AuthenticationController authenticationController = new AuthenticationController();
//        authenticationController.createUser(new MyUser("user", "user", "USER"));

    }


}


