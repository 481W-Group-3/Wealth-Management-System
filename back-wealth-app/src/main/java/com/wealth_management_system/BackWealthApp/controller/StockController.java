package com.wealth_management_system.BackWealthApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wealth_management_system.BackWealthApp.domain.StockData;
import com.wealth_management_system.BackWealthApp.repositry.StockRepository;
import com.wealth_management_system.BackWealthApp.service.StockDataFetcherService;
import com.wealth_management_system.BackWealthApp.service.StockDataService;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
	
	 @Autowired
	 private StockDataService s1;
	 
	 @Autowired
	 private StockDataFetcherService s;

	    @GetMapping("/{symbol}")
	    @PreAuthorize("isAuthenticated()")
	    public List<StockData> getStockData(@PathVariable String symbol) {
	        return s1.getStockDataBySymbol(symbol);
	    }

	    @GetMapping
	    @PreAuthorize("isAuthenticated()")
	    public List<StockData> getAllStockData() {
	        return s1.getAllStockData();
	    }

	    @GetMapping("/recent")
	    @PreAuthorize("isAuthenticated()")
	    public List<StockData> getRecentStockData() {
	        return s1.getRecentStockData();
	    }
	    
	    /*
	     * IMPORTANT
	     * No need to call this method below, don't connect it to front end
	     * It was created just for testing purposes
	     */
	    
	    @PostMapping("/fetch-data")
		@PreAuthorize("isAuthenticated()")
	    public void fetchStockDataManually() {
	        s.fetchAndStoreStockData();
	    }

}
