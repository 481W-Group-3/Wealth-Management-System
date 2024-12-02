package com.wealth_management_system.BackWealthApp.controller;

import com.wealth_management_system.BackWealthApp.domain.Maintenance;
import com.wealth_management_system.BackWealthApp.domain.MyUser;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.propertyCalc.CalculatorService;
import com.wealth_management_system.BackWealthApp.service.PropertyService;
import com.wealth_management_system.BackWealthApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;
    @Autowired
    private CalculatorService calculatorService;
    
    @Autowired
    private UserService userService;

    // Add a property
    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Property> addProperty(@RequestBody Property property, Principal principal) {
    	
    	System.out.println("recieved add property request from: " + principal.getName());
        Property createdProperty = propertyService.addProperty(property, principal.getName());
        //userService.addPropertyToUser(user.getId(), property);
        return ResponseEntity.ok(createdProperty);
    }

    // Get a property by Id
    @GetMapping("/{id}/properties")
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
    public ResponseEntity<List<Property>> listAllProperties(Principal principal) {
        List<Property> properties = propertyService.listAllProperties(principal.getName());
        return ResponseEntity.ok(properties);
    }
    
    //Add a property to a user
    /*
    @GetMapping("{userId}/")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Property> addPropertyToUser(@RequestBody MyUser user, @RequestBody Property property){
    	userService.addPropertyToUser(user.getUsername(), property);
    	return ResponseEntity.ok(property);
    }
    */

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

    @GetMapping("/{propertyId}/propertyTax")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Double> calculatePropertyTax(@PathVariable int propertyId) {
        Property property = propertyService.getPropertyById(propertyId);
        System.out.println(property);
        try {
            double propertyAmount = calculatorService.getPropertyTax(property.getPropertyValue(), property.getState(), property.getCounty(), property.getCity(), property.getZipCode()+"");
            return ResponseEntity.ok(propertyAmount);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/propertyTax/calculate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Double> calculateIndividualTax(@RequestParam String propertyValue,
                                                         @RequestParam String state,
                                                         @RequestParam String county,
                                                         @RequestParam String city,
                                                         @RequestParam String zipCode) {
        System.out.println("This is the property value: " + propertyValue);
        try {
            double propertyAmount = calculatorService.getPropertyTax(Double.parseDouble(propertyValue), state, county, city, zipCode);
            return ResponseEntity.ok(propertyAmount);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/propertyTest")
    @PreAuthorize("isAuthenticated()")
    public Double testingTax(){
        return 10.0;
    }
}

