package com.wealth_management_system.BackWealthApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.wealth_management_system.BackWealthApp.domain.Investment;
import com.wealth_management_system.BackWealthApp.service.InvestmentService;
import com.wealth_management_system.BackWealthApp.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/investments")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @Autowired
    private UserService userService;

    // Add a new investment
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Investment> addInvestment(@RequestBody Investment investment, Principal principal) {
        Investment newInvestment = investmentService.addInvestment(investment, principal.getName());
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
    public ResponseEntity<List<Investment>> listAllInvestments(Principal principal) {
        List<Investment> investments = investmentService.listAllInvestments(principal.getName());
        return new ResponseEntity<>(investments, HttpStatus.OK);
    }

    // List investment of user
    @GetMapping("/list/{id}")
    @PreAuthorize("isAuthenticated()")
    public List<Investment> listUserInvestments(@PathVariable int id, Authentication authentication) {
        if (!authentication.getAuthorities().toString().contains("ADMIN"))
            return null;
        try {
            return investmentService.listAllInvestments(userService.getUserById(id).getUsername());
        } catch (Exception e) {
            return null;
        }
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

    // Rebalance portfolio
    @PostMapping("/{investmentId}/rebalance")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> rebalancePortfolio(@PathVariable int investmentId) {
        investmentService.rebalancePortfolio(investmentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
