package com.wealth_management_system.BackWealthApp.predictions;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wealth_management_system.BackWealthApp.domain.StockData;

@Component
public class AlphaVantageAPI {
	
	private final String API_KEY = "NMCQD31Z1404NA4H"; // Replace with your actual API key
    private final String BASE_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public AlphaVantageAPI() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper(); // Jackson ObjectMapper for JSON parsing
    }

    public List<StockData> getStockData(String symbol) {
        String url = BASE_URL + "&symbol=" + symbol + "&apikey=" + API_KEY;

        // Make the API call and get the response as a String
        String response = restTemplate.getForObject(url, String.class);

        // Parse the response and convert it to a List of StockData objects
        return parseStockData(response, symbol);
    }

    private List<StockData> parseStockData(String response, String symbol) {
        List<StockData> stockDataList = new ArrayList<>();

        try {
            // Parse the JSON response
            JsonNode rootNode = objectMapper.readTree(response);

            // Get the "Time Series (Daily)" node from the response JSON
            JsonNode timeSeriesNode = rootNode.path("Time Series (Daily)");

            if (timeSeriesNode.isMissingNode()) {
                // Handle the case where the response is missing data (possibly an error or no data available)
                throw new RuntimeException("Error: No data found for symbol " + symbol);
            }

            // Loop through each entry (date) in the time series
            timeSeriesNode.fields().forEachRemaining(entry -> {
                String dateString = entry.getKey(); // The date of the stock data
                JsonNode data = entry.getValue(); // Stock data for the given date

                // Convert the dateString to LocalDate using DateTimeFormatter
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate date = LocalDate.parse(dateString, formatter);

                // Get the closing price and volume from the response (other fields can also be added)
                String closingPrice = data.path("4. close").asText(); // Closing price
                String volume = data.path("5. volume").asText(); // Volume

                // Convert the values to appropriate types
                StockData stockData = new StockData();
                stockData.setSymbol(symbol);
                stockData.setDate(date); // Set LocalDate
                stockData.setClosingPrice(new BigDecimal(closingPrice)); // Convert closing price to BigDecimal
                stockData.setVolume(Long.parseLong(volume)); // Convert volume to Long

                stockDataList.add(stockData);
            });
        } catch (Exception e) {
            // Handle any parsing errors (e.g., malformed JSON, API issues)
            e.printStackTrace();
            throw new RuntimeException("Error while parsing stock data for symbol " + symbol, e);
        }

        return stockDataList;
    }

}
