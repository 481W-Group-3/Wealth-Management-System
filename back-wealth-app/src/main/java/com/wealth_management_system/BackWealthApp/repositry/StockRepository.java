package com.wealth_management_system.BackWealthApp.repositry;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.StockData;

@Repository
public interface StockRepository extends JpaRepository<StockData, Integer>{
	
	List<StockData> findBySymbol(String symbol);
	void deleteBySymbol(String symbol);
	void deleteBySymbolAndDateBefore(String symbol, LocalDate minusMonths);
	List<StockData> findByDateAfter(LocalDate oneMonthAgo);

}
