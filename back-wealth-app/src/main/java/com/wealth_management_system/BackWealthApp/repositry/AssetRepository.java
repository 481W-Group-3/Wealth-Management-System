package com.wealth_management_system.BackWealthApp.repositry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wealth_management_system.BackWealthApp.domain.Asset;
import com.wealth_management_system.BackWealthApp.domain.MyUser;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer>{
	List<Asset> findByUser(MyUser user);
	Asset findById(int id);

}
