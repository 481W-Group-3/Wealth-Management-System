package com.wealth_management_system.BackWealthApp.propertyCalc;

import com.fasterxml.jackson.databind.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class NinjaAPI {

    private final String API_KEY = "JLPxxAodR1K+naH6/A9RRA==pOdQIKuhKMzYxp1X";
    private final String BASE_URL = "https://api.api-ninjas.com/v1/propertytax?";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public NinjaAPI() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public double getTaxPercent(String state, String county, String city, String zip) {
        String url = BASE_URL + "city=" + city + "&state=" + state + "&county=" + county + "&zip=" + zip;

        double taxPercent = -1;

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", API_KEY);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            String response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();

            JsonNode data = objectMapper.readTree(response);

            //using the 50th percentile because it can returns the median value but can return 25 and 75 if needed
            taxPercent = data.get(0).get("property_tax_50th_percentile").doubleValue();
        }
        catch(Exception err) {
            System.out.println("Fetch did not work: " + err);
        }

        return taxPercent;
    }
}
