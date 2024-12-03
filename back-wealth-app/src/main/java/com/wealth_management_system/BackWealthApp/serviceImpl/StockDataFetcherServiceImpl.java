package com.wealth_management_system.BackWealthApp.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.domain.StockData;
import com.wealth_management_system.BackWealthApp.predictions.AlphaVantageAPI;
import com.wealth_management_system.BackWealthApp.service.StockDataFetcherService;
import com.wealth_management_system.BackWealthApp.service.StockDataService;



@Service
public class StockDataFetcherServiceImpl implements StockDataFetcherService {

    private boolean isScheduledTaskInitialized = false;

    private final AlphaVantageAPI alphaVantageClient;
    private final StockDataService stockDataService;

    public StockDataFetcherServiceImpl(AlphaVantageAPI alphaVantageClient, StockDataService stockDataService) {
        this.alphaVantageClient = alphaVantageClient;
        this.stockDataService = stockDataService;
    }

    @Scheduled(fixedRate = 86400000) // Run once every 24 hours
    public void fetchAndStoreStockData() {
        if (isScheduledTaskInitialized) {
            List<String> symbols = List.of("AAPL", "GOOG", "MSFT", "META", "ORCL", "ADBE", "IBM", "INTU", "TSLA"); // List of stock symbols

            for (String symbol : symbols) {
                try {
                    // Step 1: Delete data older than one month
                    stockDataService.deleteOlderThanOneMonth(symbol);
                    System.out.println("After the delete call");

                    // Step 2: Fetch stock data from the API
                    List<StockData> stockData = alphaVantageClient.getStockData(symbol);
                    System.out.println("After the intializtion of stock");

                    // Step 3: Ensure only today's data is used
                    LocalDate today = LocalDate.now();
                    stockData = stockData.stream()
                            .filter(data -> data.getDate().equals(today)) // Filter by today's date
                            .collect(Collectors.toList());

                    // Step 4: Save new data
                    for (StockData data : stockData) {
                        stockDataService.saveOrUpdateStockData(data);
                    }

                } catch (Exception e) {
                    e.printStackTrace(); // Log the error and continue with the next symbol
                }
            }
        } else {
            isScheduledTaskInitialized = true; // Prevent execution immediately after startup
        }
    }
}




