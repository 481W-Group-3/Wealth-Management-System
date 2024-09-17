package com.wealth_management_system.BackWealthApp.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.serviceImpl.AssetServiceImpl;

@Controller
@RequestMapping("/asset")
public class AssetController {
	private final AssetServiceImpl assetService;
	
	@Autowired
	public AssetController(AssetServiceImpl assetService) {
		this.assetService = assetService;
	}
	
	@PostMapping("/asset")
	public ResponseEntity<Asset> addAsset(@RequestBody Asset asset){
		Asset newAsset = assetService.addAsset(asset);
		return ResponseEntity.ok(newAsset);
	}
	
	@GetMapping("/asset/{id}")
	public ResponseEntity<Asset> getAssetById(@PathVariable int id){
		Optional<Asset> asset = assetService.getAssetById(id);
		return asset.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@GetMapping("/asset")
	public List<Asset> getAllAssets(){
		return assetService.listAllAssets();
	}
	
	@PutMapping("/assets/{id}")
	public ResponseEntity<Asset> updateAsset(@RequestBody Asset asset){
		Asset updatedAsset = assetService.updateAsset(asset);
		return ResponseEntity.ok(updatedAsset);
	}
	
	@DeleteMapping("/asset/{id}")
	public ResponseEntity<String> deleteAsset(@PathVariable int id){
		assetService.deleteAsset(id);
		return ResponseEntity.ok("Asset deleted successfully");
	}
	
	
}
