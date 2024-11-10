package com.wealth_management_system.BackWealthApp.controller;

import java.security.Principal;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import com.wealth_management_system.BackWealthApp.domain.Lease;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.service.LeaseService;

@RestController
@RequestMapping("/api/leases")
public class LeaseController {
	
	@Autowired
	private LeaseService leaseService;
	
	@PostMapping("/create")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<Lease> createLease(@RequestBody Lease lease){
		Lease newLease = leaseService.createLease(lease);
		return ResponseEntity.ok(newLease);
	}
	
	// Get a lease by Id
    @GetMapping("/{id}/leases")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Lease> getLeaseById(@PathVariable int id) {
        Lease lease = leaseService.getLeaseById(id);
        if (lease != null) {
            return ResponseEntity.ok(lease);
        }
        return ResponseEntity.notFound().build();
    }
    
    // List all leases for the given property
    @GetMapping("/list")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Lease>> listAllLeases(@PathVariable int propertyId) {
        List<Lease> leases = leaseService.listByProperty(propertyId);
        return ResponseEntity.ok(leases);
    }
    
    
 // Update a property
    @PutMapping("/update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Lease> updateLease(@PathVariable int id, @RequestBody Lease newLease) {
        Lease updatedLease = leaseService.updateLease(id, newLease);
        return ResponseEntity.ok(updatedLease);
    }

    // Delete a property by Id
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteProperty(@PathVariable int id) {
        leaseService.deleteLease(id);
        return ResponseEntity.noContent().build();
    }
    
    
	
}
