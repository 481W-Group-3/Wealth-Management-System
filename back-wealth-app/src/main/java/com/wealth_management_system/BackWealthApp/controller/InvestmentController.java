package com.wealth_management_system.BackWealthApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.domain.Property;
import com.wealth_management_system.BackWealthApp.service.InvestmentService;

import java.util.List;

@RestController
@RequestMapping("/api/investments")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    // Add a new investment
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Investment> addInvestment(@RequestBody Investment investment) {
    	System.out.println("Received investment: " + investment);
    	System.out.println("investment amount is: " + investment.getPrincipalInitial());
    	System.out.println("current amount is: " + investment.getCurrentValue());
    	System.out.println("investmemt type is: " + investment.getType());
    	//System.out.println("investment amount is: " + investment.getPrincipalInitial());
        Investment newInvestment = investmentService.addInvestment(investment);
        return new ResponseEntity<>(newInvestment, HttpStatus.CREATED);
    }
    


    // Get investment by ID
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()") 
    public ResponseEntity<Investment> getInvestmentById(@PathVariable int id) {
        Investment investment = investmentService.getInvestmentById(id);
        return new ResponseEntity<>(investment, HttpStatus.OK);
    }

    // List all investments
    @GetMapping
    @PreAuthorize("isAuthenticated()") 
    public ResponseEntity<List<Investment>> listAllInvestments() {
        List<Investment> investments = investmentService.listAllInvestments();
        return new ResponseEntity<>(investments, HttpStatus.OK);
    }

    // Update an investment
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()") 
    public ResponseEntity<Investment> updateInvestment(@PathVariable int id, @RequestBody Investment investment) {
        investment.setId(id); // Assuming Investment has an 'id' field
        Investment updatedInvestment = investmentService.updateInvestment(investment);
        return new ResponseEntity<>(updatedInvestment, HttpStatus.OK);
    }

    // Delete an investment
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()") 
    public ResponseEntity<Void> deleteInvestment(@PathVariable int id) {
        investmentService.deleteInvestment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Link investment to property
    @PostMapping("/{investmentId}/properties/{propertyId}")
    @PreAuthorize("isAuthenticated()") 
    public ResponseEntity<Void> linkInvestmentToProperty(@PathVariable int investmentId, @PathVariable int propertyId) {
        investmentService.linkInvestmentToProperty(investmentId, propertyId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Get properties by investment ID
    @GetMapping("/{investmentId}/properties")
    @PreAuthorize("isAuthenticated()") 
    public ResponseEntity<List<Property>> getPropertiesByInvestment(@PathVariable int investmentId) {
        List<Property> properties = investmentService.getPropertiesByInvestment(investmentId);
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    // Get asset by investment ID
   /* @GetMapping("/{investmentId}/asset")
    public ResponseEntity<Asset> getAssetByInvestment(@PathVariable int investmentId) {
        Asset asset = investmentService.getAssetByInvestment(investmentId);
        return new ResponseEntity<>(asset, HttpStatus.OK);
    }*/

    // Rebalance portfolio
    @PostMapping("/{investmentId}/rebalance")
    @PreAuthorize("isAuthenticated()") 
    public ResponseEntity<Void> rebalancePortfolio(@PathVariable int investmentId) {
        investmentService.rebalancePortfolio(investmentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}


