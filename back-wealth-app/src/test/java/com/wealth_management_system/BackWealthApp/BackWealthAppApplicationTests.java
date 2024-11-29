package com.wealth_management_system.BackWealthApp;

import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.propertyCalc.CalculatorService;
import com.wealth_management_system.BackWealthApp.propertyCalc.NinjaAPI;
import com.wealth_management_system.BackWealthApp.service.AssetService;
import com.wealth_management_system.BackWealthApp.serviceImpl.AssetServiceImpl;
import com.wealth_management_system.BackWealthApp.serviceImpl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class BackWealthAppApplicationTests {

	@Autowired
	private UserServiceImpl userService;
	@Autowired
	private AssetService assetService;

	@Test
	void contextLoads() throws Exception {
//		userService.deleteUser(12);

//		List<Asset> list = assetService.listAllAssets("username");
//		for (Asset asset : list) {
//			if(user.getId() > 10) {
//				userService.deleteUser(user.getId());
//				continue;
//			}
//			System.out.println(asset.getId() + " " + asset.getUserId() + " " + asset.getAllocation() + " " + asset.getCurrentValue());
//		}
	}

	@Autowired
	private CalculatorService calculatorService;

	@Test
	void APITest() throws Exception {
		double value = calculatorService.getPropertyTax("100000", "MI", "Oakland", "Farmington Hills", "48331");
		System.out.println(value);
	}

}
