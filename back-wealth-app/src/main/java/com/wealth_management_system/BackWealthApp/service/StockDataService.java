package com.wealth_management_system.BackWealthApp.service;

import java.util.List;

import com.wealth_management_system.BackWealthApp.domain.StockData;

public interface StockDataService {
	
	void saveOrUpdateStockData(StockData stockData);

	void deleteBySymbol(String symbol);

	void deleteOlderThanOneMonth(String symbol);

	List<StockData> getStockDataBySymbol(String symbol);

	List<StockData> getAllStockData();

	List<StockData> getRecentStockData();

}
