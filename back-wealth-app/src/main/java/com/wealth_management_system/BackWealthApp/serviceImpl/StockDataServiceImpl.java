package com.wealth_management_system.BackWealthApp.serviceImpl;


import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wealth_management_system.BackWealthApp.domain.StockData;
import com.wealth_management_system.BackWealthApp.repositry.StockRepository;
import com.wealth_management_system.BackWealthApp.service.StockDataService;

import jakarta.transaction.Transactional;

@Service
public class StockDataServiceImpl implements StockDataService{

	
    
    @Autowired
    private StockRepository stockRepository;

    public List<StockData> getStockDataBySymbol(String symbol) {
        return stockRepository.findBySymbol(symbol);
    }

    public List<StockData> getAllStockData() {
        return stockRepository.findAll();
    }

    public List<StockData> getRecentStockData() {
        LocalDate oneMonthAgo = LocalDate.now().minusMonths(1);
        return stockRepository.findByDateAfter(oneMonthAgo);
    }

    
    @Transactional
    public void saveOrUpdateStockData(StockData stockData) {
       
        stockRepository.save(stockData);
    }

   
    public void deleteBySymbol(String symbol) {
        
        stockRepository.deleteBySymbol(symbol);
    }

    
    public List<StockData> findAll() {
        return stockRepository.findAll();
    }

    @Transactional
    public void deleteOlderThanOneMonth(String symbol) {
        LocalDate cutoffDate = LocalDate.now().minusMonths(1);
        System.out.println("Deleting data older than: " + cutoffDate + " for symbol: " + symbol);
        stockRepository.deleteBySymbolAndDateBefore(symbol, cutoffDate);
    }
 


}
