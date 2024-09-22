package com.wealth_management_system.BackWealthApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.domain.Renter;
import com.wealth_management_system.BackWealthApp.service.RenterService;

@RestController
@RequestMapping("/api/renters")
public class RenterController {

    @Autowired
    private RenterService renterService;

    // Add a new renter
    @PostMapping("/add")
    public ResponseEntity<Renter> addRenter(@RequestBody Renter renter) {
        Renter newRenter = renterService.addRenter(renter);
        return new ResponseEntity<>(newRenter, HttpStatus.CREATED);
    }

    // Get renter by ID
    @GetMapping("/{id}")
    public ResponseEntity<Renter> getRenterById(@PathVariable int id) {
        Renter renter = renterService.getRenterById(id);
        if (renter != null) {
            return new ResponseEntity<>(renter, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // List all renters
    @GetMapping("/list")
    public ResponseEntity<List<Renter>> listAllRenters() {
        List<Renter> renters = renterService.listAllRenters();
        return new ResponseEntity<>(renters, HttpStatus.OK);
    }

    // Update an existing renter
    @PutMapping("/update/{id}")
    public ResponseEntity<Renter> updateRenter(@PathVariable int id, @RequestBody Renter renter) {
        Renter existingRenter = renterService.getRenterById(id);
        if (existingRenter != null) {
            renter.setId(id);  // Ensure the renter ID is correct
            Renter updatedRenter = renterService.updateRenter(renter);
            return new ResponseEntity<>(updatedRenter, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a renter
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRenter(@PathVariable int id) {
        Renter existingRenter = renterService.getRenterById(id);
        if (existingRenter != null) {
            renterService.deleteRenter(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get a list of properties by renter ID
    @GetMapping("/{renterId}/properties")
    public ResponseEntity<List<Property>> getPropertiesByRenter(@PathVariable int renterId) {
        List<Property> properties = renterService.getPropertiesByRenter(renterId);
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    // Link a renter to a lease
    @PostMapping("/{renterId}/link-to-lease/{leaseId}")
    public ResponseEntity<Void> linkRenterToLease(@PathVariable int renterId, @PathVariable int leaseId) {
        renterService.linkRenterToLease(renterId, leaseId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
