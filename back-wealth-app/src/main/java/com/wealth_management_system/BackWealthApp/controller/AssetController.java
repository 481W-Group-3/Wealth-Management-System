package com.wealth_management_system.BackWealthApp.controller;

import java.security.Principal;
import java.util.*;

import com.wealth_management_system.BackWealthApp.serviceImpl.AssetServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.service.UserService;

@RestController
@RequestMapping("/api/assets")
public class AssetController {
    @Autowired
    private AssetServiceImpl assetService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Asset> addAsset(@RequestBody Asset asset, Principal principal) {
        Asset newAsset = assetService.addAsset(asset, principal.getName());
        return new ResponseEntity<>(newAsset, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Asset> getAssetById(@PathVariable int id) {
        Asset asset = assetService.getAssetById(id);
        if (asset != null) {
            return ResponseEntity.ok(asset);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Asset>> getAllAssets(Principal principal) {
        List<Asset> assets = assetService.listAllAssets(principal.getName());
        return new ResponseEntity<>(assets, HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    @PreAuthorize("isAuthenticated()")
    public List<Asset> getUserAssets(@PathVariable int id, Authentication authentication) {
        if (!authentication.getAuthorities().toString().contains("ADMIN"))
            return null;
        try {
            return assetService.listAllAssets(userService.getUserById(id).getUsername());
        } catch (Exception e) {
            return null;
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Asset> updateAsset(@PathVariable int id, @RequestBody Asset asset) {
        asset.setId(id); // Assuming Asset has a setId method
        Asset updatedAsset = assetService.updateAsset(asset);
        return ResponseEntity.ok(updatedAsset);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> deleteAsset(@PathVariable int id) {
        assetService.deleteAsset(id);
        return ResponseEntity.ok("Asset deleted successfully");
    }

}
