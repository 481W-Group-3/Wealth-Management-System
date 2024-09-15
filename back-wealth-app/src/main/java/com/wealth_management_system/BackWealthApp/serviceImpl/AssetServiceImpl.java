package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.repositry.AssetRepository;
import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.service.AssetService;

/*
 * 
 */

@Service
public class AssetServiceImpl implements AssetService {
	
	private final AssetRepository assetRepository;
	private InvestmentServiceImpl investmentService;
	
	@Autowired
	public AssetServiceImpl(AssetRepository assetRepository) {
		this.assetRepository = assetRepository;
	}

	//Add an asset
	@Override
	public Asset addAsset(Asset asset) {
		return assetRepository.save(asset);
	}

	//Find an asset by id
	@Override
	public Asset getAssetById(int id) {
		Optional<Asset> assetRep = assetRepository.findById(id);
		if(assetRep.isPresent()) {
			Asset asset = assetRep.get();
			return asset;
		}else {
			throw new RuntimeException("Asset not found");
		}
	}
	
	//List all the assets
	@Override
	public List<Asset> listAllAssets() {
		return assetRepository.findAll();
	}

	@Override
	public Asset updateAsset(Asset asset) {
		Optional<Asset> existingAsset = assetRepository.findById(asset.id());
		if(existingAsset.isPresent()) {
			Asset tempAsset = existingAsset.get();
			tempAsset.setCurrentValue(asset.getCurrentValue());
			tempAsset.setDescr(asset.getDescr());
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

}