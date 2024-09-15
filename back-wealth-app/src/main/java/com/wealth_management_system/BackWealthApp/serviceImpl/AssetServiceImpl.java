package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.AssetRepository;
import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.service.AssetService;

/*
 * 
 */

@Service
public class AssetServiceImpl impements AssetService {
	
	private final AssetRepository assetRepository;
	
	@Autowired
	public AssetServiceImpl(AssetRepository assetRepository) {
		this.assetRepository = assetRepository;
	}

}
