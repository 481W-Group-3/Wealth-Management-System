package com.wealth_management_system.BackWealthApp.controller;

import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    // Add a property
    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Property> addProperty(@RequestBody Property property) {
    	System.out.println("recieved add property request from: " + property.getAddress());
        Property createdProperty = propertyService.addProperty(property);
        return ResponseEntity.ok(createdProperty);
    }

    // Get a property by Id
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Property> getPropertyById(@PathVariable int id) {
        Property property = propertyService.getPropertyById(id);
        if (property != null) {
            return ResponseEntity.ok(property);
        }
        return ResponseEntity.notFound().build();
    }

    // List all properties
    @GetMapping("/list")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Property>> listAllProperties() {
        List<Property> properties = propertyService.listAllProperties();
        return ResponseEntity.ok(properties);
    }

    // Update a property
    @PutMapping("/update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Property> updateProperty(@RequestBody Property property) {
        Property updatedProperty = propertyService.updateProperty(property);
        return ResponseEntity.ok(updatedProperty);
    }

    // Delete a property by Id
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteProperty(@PathVariable int id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    // Link a renter to a property
    @PostMapping("/linkRenter/{propertyId}/{renterId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> linkRenterToProperty(@PathVariable int propertyId, @PathVariable int renterId) {
        propertyService.linkRenterToProperty(propertyId, renterId);
        return ResponseEntity.ok().build();
    }

    // Link a lease to a property
    @PostMapping("/linkLease/{propertyId}/{leaseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> linkLeaseToProperty(@PathVariable int propertyId, @PathVariable int leaseId) {
        propertyService.linkLeaseToProperty(propertyId, leaseId);
        return ResponseEntity.ok().build();
    }

    // Get renters by property Id
    @GetMapping("/{propertyId}/renters")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Renter>> getRentersByProperty(@PathVariable int propertyId) {
        List<Renter> renters = propertyService.getRentersByProperty(propertyId);
        return ResponseEntity.ok(renters);
    }

    // Get maintenance by property Id
    @GetMapping("/{propertyId}/maintenance")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Maintenance>> getMaintenanceByProperty(@PathVariable int propertyId) {
        List<Maintenance> maintenanceList = propertyService.getMaintenanceByProperty(propertyId);
        return ResponseEntity.ok(maintenanceList);
    }

    // Calculate revenue for a property
    @GetMapping("/{propertyId}/revenue")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Double> calculateRevenue(@PathVariable int propertyId) {
        double revenue = propertyService.calculateRevenue(propertyId);
        return ResponseEntity.ok(revenue);
    }
}

