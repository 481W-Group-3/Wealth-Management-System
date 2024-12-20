package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.Asset;

public interface AssetService {

	// add an asset to the list
	Asset addAsset(Asset asset, String username);

	// get an asset info by id
	Asset getAssetById(int id);

	// list all the assets
	List<Asset> listAllAssets(String username);

	// update an assets
	Asset updateAsset(Asset asset);

	// delete an asset
	void deleteAsset(int id);

}
