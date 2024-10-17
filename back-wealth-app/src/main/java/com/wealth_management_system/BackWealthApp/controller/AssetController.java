package com.wealth_management_system.BackWealthApp.controller;

import java.security.Principal;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.serviceImpl.AssetServiceImpl;
import com.wealth_management_system.BackWealthApp.serviceImpl.UserServiceImpl;

@RestController
@RequestMapping("/api/assets")
public class AssetController {
	@Autowired
	private AssetServiceImpl assetService;
	
	@Autowired
	private UserServiceImpl userService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Asset> addAsset(@RequestBody Asset asset, Principal principal){
        Asset newAsset = assetService.addAsset(asset, principal.getName());
        return ResponseEntity.ok(newAsset);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Asset> getAssetById(@PathVariable int id){
        Asset asset = assetService.getAssetById(id);
        if (asset != null) {
            return ResponseEntity.ok(asset);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Asset> getAllAssets(Principal principal){
        return assetService.listAllAssets(principal.getName());
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Asset> updateAsset(@PathVariable int id, @RequestBody Asset asset){
        asset.setId(id); // Assuming Asset has a setId method
        Asset updatedAsset = assetService.updateAsset(asset);
        return ResponseEntity.ok(updatedAsset);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> deleteAsset(@PathVariable int id){
        assetService.deleteAsset(id);
        return ResponseEntity.ok("Asset deleted successfully");
    }
    /*
	@PostMapping("/asset")
    @PreAuthorize("isAuthenticated()")
	public ResponseEntity<Asset> addAsset(@RequestBody Asset asset){
		Asset newAsset = assetService.addAsset(asset);
		return ResponseEntity.ok(newAsset);
	}
	
	@GetMapping("/asset/{id}")
    @PreAuthorize("isAuthenticated()")
	public ResponseEntity<Asset> getAssetById(@PathVariable int id){
		Optional<Asset> asset = assetService.getAssetById(id);
		return asset.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@GetMapping("/asset")
    @PreAuthorize("isAuthenticated()")
	public List<Asset> getAllAssets(){
		return assetService.listAllAssets();
	}
	
	@PutMapping("/assets/{id}")
    @PreAuthorize("isAuthenticated()")
	public ResponseEntity<Asset> updateAsset(@RequestBody Asset asset){
		Asset updatedAsset = assetService.updateAsset(asset);
		return ResponseEntity.ok(updatedAsset);
	}
	
	@DeleteMapping("/asset/{id}")
    @PreAuthorize("isAuthenticated()")
	public ResponseEntity<String> deleteAsset(@PathVariable int id){
		assetService.deleteAsset(id);
		return ResponseEntity.ok("Asset deleted successfully");
	}
	*/
	
}
