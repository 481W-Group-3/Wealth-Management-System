package com.wealth_management_system.BackWealthApp.propertyCalc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    NinjaAPI ninjaAPI;

    public CalculatorService(){
        ninjaAPI = new NinjaAPI();
    }

    public double getPropertyTax(double propertyValue, String state, String county, String city, String zip) throws Exception{
        double percent = ninjaAPI.getTaxPercent(state, county, city, zip);
        if(percent == -1){
            throw new Exception("could not get property tax");
        }
        return percent * propertyValue;
    }
}
