package com.wealth_management_system.BackWealthApp;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class BackWealthAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackWealthAppApplication.class, args);


        System.out.println("********************************");

        System.out.println("********************************");

    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**").allowedOrigins("http://localhost:5173");
//            }
//        };
//    }
}


