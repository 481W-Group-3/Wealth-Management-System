package com.wealth_management_system.BackWealthApp.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wealth_management_system.BackWealthApp.domain.Retirement;
import com.wealth_management_system.BackWealthApp.service.RetirementService;

@RestController
@RequestMapping("/api/retirement")
public class RetirementController {

    @Autowired
    private RetirementService retirementService;

    // Create a new retirement record
    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Retirement> createRetirement(@RequestBody Retirement retirement, Principal principal) {
        Retirement savedRetirement = retirementService.saveRetirement(retirement, principal.getName());
        return new ResponseEntity<>(savedRetirement, HttpStatus.CREATED);
    }

    // Get a retirement record by ID
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Retirement> getRetirementById(@PathVariable int id) {
        Optional<Retirement> retirement = retirementService.getRetirementById(id);
        return retirement.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get all retirement records
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Retirement>> getAllRetirements() {
        List<Retirement> retirements = retirementService.getAllRetirements();
        return new ResponseEntity<>(retirements, HttpStatus.OK);
    }

    // Update a retirement record
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Retirement> updateRetirement(@PathVariable int id, @RequestBody Retirement retirement) {
        try {
            Retirement updatedRetirement = retirementService.updateRetirement(id, retirement);
            return new ResponseEntity<>(updatedRetirement, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a retirement record by ID
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteRetirement(@PathVariable int id) {
        retirementService.deleteRetirement(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Calculate years left until retirement
    @GetMapping("/years-to-retirement")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Integer> calculateYearsToRetirement(@RequestParam int age, @RequestParam int retirementAge) {
        int yearsToRetirement = retirementService.calculateYearsToRetirement(age, retirementAge);
        return new ResponseEntity<>(yearsToRetirement, HttpStatus.OK);
    }

    // Estimate savings at retirement
    @GetMapping("/estimate-savings")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Double> estimateRetirementSavings(@RequestParam int currentSavings,
            @RequestParam int income,
            @RequestParam int retirementAge,
            @RequestParam int currentAge) {
        double estimatedSavings = retirementService.estimateRetirementSavings(currentSavings, income, retirementAge,
                currentAge);
        return new ResponseEntity<>(estimatedSavings, HttpStatus.OK);
    }

}
