package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.AssetRepository;
import com.wealth_management_system.BackWealthApp.repositry.UserRepositry;
import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.service.AssetService;

/*
 * 
 */

@Service
public class AssetServiceImpl implements AssetService {
	@Autowired
	private AssetRepository assetRepository;
	//private InvestmentServiceImpl investmentService;
	@Autowired
	private UserRepositry userRepository;

	//Add an asset
	@Override
	// @isAuthenticated
	public Asset addAsset(Asset asset, String username) {
		MyUser user = userRepository.findMyUserByUsername(username);
		asset.setUser(user);
		return assetRepository.save(asset);
	}

	//Find an asset by id
	@Override
	public Asset getAssetById(int id) {
		Asset assetRep = assetRepository.findById(id);
		return assetRep;
	}
	
	//List all the assets
	@Override
	public List<Asset> listAllAssets(String username) {
		MyUser user = userRepository.findMyUserByUsername(username);
		return assetRepository.findByUser(user);
	}

	@Override
	public Asset updateAsset(Asset asset) {
		Asset existingAsset = assetRepository.findById(asset.id());
		if(existingAsset != null) {
			Asset tempAsset = existingAsset;
			tempAsset.setCurrentValue(asset.getCurrentValue());
			tempAsset.setAllocation(asset.getAllocation());
			tempAsset.setOrigValue(asset.getOrigValue());
			tempAsset.setType(asset.getType());
			
			return tempAsset;
		}else {
			throw new RuntimeException("Asset not found");
		}
	}

	//Delete asset by id
	@Override
	public void deleteAsset(int id) {
		assetRepository.deleteById(id);
	}

	/*
	//Link asset to investment
	@Override
	public void linkAssetToInvestment(int assetId, int investmentId) {
		Optional<Asset> assetRep = assetRepository.findById(assetId);
		if(assetRep.isPresent()) {
			Asset asset = assetRep.get();
			Investment investment = investmentService.getInvestmentById(investmentId);
			asset.setInvestment(investment);
		}else {
			throw new RuntimeException("Asset not found");
		}
		
	}
	*/

}