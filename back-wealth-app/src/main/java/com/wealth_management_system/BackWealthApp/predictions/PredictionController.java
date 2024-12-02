package com.wealth_management_system.BackWealthApp.predictions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PredictionController {
	
	@Autowired
    private PredictionService alphaVantageService;

    @GetMapping("/api/stock")
    //@PreAuthorize("isAuthenticated()")
    public String getStockData(@RequestParam(defaultValue = "AAPL") String symbol) {
        return alphaVantageService.getDailyStockData(symbol);
    }

}
