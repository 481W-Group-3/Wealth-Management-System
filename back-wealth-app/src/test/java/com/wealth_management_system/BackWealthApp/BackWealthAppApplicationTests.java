package com.wealth_management_system.BackWealthApp;

import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.serviceImpl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class BackWealthAppApplicationTests {

	@Autowired
	private UserServiceImpl userService;

	@Test
	void contextLoads() {
		userService.deleteUser(18);
		List<MyUser> list = userService.listAllUsers();
		for (MyUser user : list) {
			System.out.println(user.toString());
		}
	}

}
