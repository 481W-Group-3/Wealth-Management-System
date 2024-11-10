package com.wealth_management_system.BackWealthApp.domain;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jdk.jfr.DataAmount;

@Entity
@Table(name="retirement")
@DataAmount
public class Retirement {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int age;
	private int retirement_age;
	private int life_expectancy;
	private int income;
	private int retirement_expenses;
	private int current_savings;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public int getRetirement_age() {
		return retirement_age;
	}
	public void setRetirement_age(int retirement_age) {
		this.retirement_age = retirement_age;
	}
	public int getLife_expectancy() {
		return life_expectancy;
	}
	public void setLife_expectancy(int life_expectancy) {
		this.life_expectancy = life_expectancy;
	}
	public int getIncome() {
		return income;
	}
	public void setIncome(int income) {
		this.income = income;
	}
	public int getRetirement_expenses() {
		return retirement_expenses;
	}
	public void setRetirement_expenses(int retirement_expenses) {
		this.retirement_expenses = retirement_expenses;
	}
	public int getCurrent_savings() {
		return current_savings;
	}
	public void setCurrent_savings(int current_savings) {
		this.current_savings = current_savings;
	}
	
	

}
