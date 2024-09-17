package com.wealth_management_system.BackWealthApp.service;

import java.util.List;
import java.util.Optional;

import com.wealth_management_system.BackWealthApp.domain.Asset;

public interface AssetService {
	
	//add an asset to the list
	Asset addAsset(Asset asset);
	
	//get an asset info by id
	Optional<Asset> getAssetById(int id);
	
	//list all the assets 
	List<Asset> listAllAssets();
	
	//update an assets
	Asset updateAsset(Asset asset);
	
	//delete an asset
	void deleteAsset(int id);
	
	//link an asset to investment
	void linkAssetToInvestment(int assetId, int investmentId);

}
