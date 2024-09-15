package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.repositry.PropertyRepositry;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.service.PropertyService;

/*
 * A service class to manipulate the Property entity
 */

public class PropertyServiceImpl {
	private final PropertyRepositry propertyRepository;
	
	@Autowired
	public PropertyServiceImpl(PropertyRepositry propertyRepository) {
		this.propertyRepository = propertyRepository;
	}

}
