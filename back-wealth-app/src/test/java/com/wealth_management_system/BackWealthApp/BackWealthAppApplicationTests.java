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
		List<MyUser> list = userService.listAllUsers();
		for (MyUser user : list) {
//			if(user.getId() > 10) {
//				userService.deleteUser(user.getId());
//				continue;
//			}
			System.out.println(user.toString());
		}
	}

}
