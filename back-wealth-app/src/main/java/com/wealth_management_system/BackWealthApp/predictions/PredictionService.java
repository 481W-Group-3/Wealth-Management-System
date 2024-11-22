package com.wealth_management_system.BackWealthApp.predictions;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class PredictionService {
	
	 	@Value("${alpha.vantage.api.key}")
	    private String apiKey;

	    @Value("${alpha.vantage.base.url}")
	    private String baseUrl;

	    private final RestTemplate restTemplate = new RestTemplate();

	    public String getDailyStockData(String symbol) {
	        String url = String.format("%s?function=TIME_SERIES_DAILY&symbol=%s&apikey=%s", baseUrl, symbol, apiKey);
	        return restTemplate.getForObject(url, String.class);
	    }

}
