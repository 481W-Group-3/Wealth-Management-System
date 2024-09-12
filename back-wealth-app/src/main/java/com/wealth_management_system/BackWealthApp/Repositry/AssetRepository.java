package com.wealth_management_system.BackWealthApp.Repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.Asset;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer>{

}
