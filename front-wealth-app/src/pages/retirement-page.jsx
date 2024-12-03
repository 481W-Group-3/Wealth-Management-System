import React, { useState, useEffect } from 'react';
import FormsForDashboard from '../components/user/FormsForDashboard';
import {
    fetchRetirementVariables,
    storeRetirementVariables,
    addRetirementRecord,
  } from "../services/retirementService";
  
/*
    TODO:
    X - Move the results below the calculator
    X - Connect to the backend
      - Store variables in the back end
      - If no record exists for the user, create one before storing
      - Call variables from the back end
      - If life expectancy is below current age or retirement age, send an error and halt calculations.
      - Add "Years until retirement"
*/

const RetirementPage = () => {

    const [currentAge, setCurrentAge] = useState('');
    const [retirementAge, setRetirementAge] = useState('');
    const [lifeExpectancy, setLifeExpectancy] = useState('');
    const [pretaxIncome, setPretaxIncome] = useState('');
    const [incomeIncrease, setIncomeIncrease] = useState('3');
    const [yearlyRetirementExpenses, setYearlyRetirementExpenses] = useState('');
    const [expectedInflationRate, setExpectedInflationRate] = useState('3');
    const [moneySaved, setMoneySaved] = useState('');
    const [retirementSavings, setRetirementSavings] = useState('');


  // Fetch assets and investments from the backend
  useEffect(() => {
    const loadRetirementVariables = async () => {
      try {
        const fetchedVariables = await fetchRetirementVariables();
        console.log("output of fetched: ", fetchedVariables);
        if(fetchedVariables != null){
            setCurrentAge(fetchedVariables[0]);                 // 0
            setRetirementAge(fetchedVariables[1]);              // 1
            setLifeExpectancy(fetchedVariables[2]);             // 2
            setPretaxIncome(fetchedVariables[3]);               // 3
            setYearlyRetirementExpenses(fetchedVariables[4]);   // 4
            setMoneySaved(fetchedVariables[5]);                 // 5
        }

      } catch (error) {
        console.error("Failed to fetch previous retirement variables:", error);
      }
    };

    loadRetirementVariables();
  }, []);

    const updateBackendAndCalculator = async () => {
        //Logical Verifications
        if(retirementAge < currentAge){
           alert("Retirement Age is set lower than Current Age");
        }
        else if(retirementAge > lifeExpectancy|| currentAge > lifeExpectancy){
            alert("Retirement Age or Current Age is greater than your life expectancy!");
        }
        else{
            //Update or Add variables to backend
            const storedData = {currentAge, retirementAge, lifeExpectancy, pretaxIncome, yearlyRetirementExpenses, moneySaved}
            const fetchedVariables = await fetchRetirementVariables();
            console.log("fetched variables 2: ", fetchedVariables);
            if (fetchedVariables != null){
                //store variables
                await storeRetirementVariables(fetchedVariables.id, storedData);

            }
            else{
                //add record to store variables
                await addRetirementRecord(storedData);
            }

            retirementCalculator();
        }
    }

    //Calculations
    const retirementCalculator = () => {
        
        let preparationTime = retirementAge - currentAge;
        let retirementDuration = lifeExpectancy - retirementAge;
        let percentincomeIncrease = (1+ (incomeIncrease / 100));
        let percentMoneySaved = ((moneySaved/100));
        let percentInflation = (1+(expectedInflationRate/100));

        let savings = Number(retirementSavings);
        let income = pretaxIncome * percentincomeIncrease;
        let inflation = percentInflation;

        for(let i=0; i<preparationTime;i++){
            savings = savings + (income * percentMoneySaved);
            income = income * percentincomeIncrease;
            inflation = inflation * percentInflation;  
        }

        let adjustedAnnualExpenses = yearlyRetirementExpenses * inflation;
        let totalExpenses = adjustedAnnualExpenses;

        for(let i=0; i<retirementDuration; i++){
            adjustedAnnualExpenses = (adjustedAnnualExpenses * percentInflation);
            totalExpenses += adjustedAnnualExpenses;
        }
        
        calculationTotalAmount(totalExpenses);
        calculationMoneyInvested(savings);
        calculationPercentageNeeded(totalExpenses, savings, preparationTime);
    }



    //Set total needed for retirement
    const calculationTotalAmount = (total) => {
        total = Math.floor(total);
        document.getElementById('retirementCalcTotalAmount').innerHTML = '$' + total;
    }

    //Set money saved for retirement
    const calculationMoneyInvested = (total) => {
        total = Math.floor(total);
        document.getElementById('retirementCalcMoneyInvested').innerHTML = '$' + total;
    }

    //Set percentage still needed for retirement (monthly)
    const calculationPercentageNeeded = (expenses, savings, time) => {
        let percentage = Math.floor((savings / expenses) * 100); 
        
        let totalYearly;
        if(percentage > 100){
            percentage = 100;
        }
        if(percentage == null || isNaN(parseFloat(percentage))){
            percentage = 0;
        }
        if(time > 0){
            totalYearly = Math.floor((expenses - savings) / time);
        }
        else{
            totalYearly = Math.floor((expenses - savings));
        }
        if(totalYearly < 0){
            totalYearly = 0;
        }
        let totalMonthly = Math.round(totalYearly/12);
        document.getElementById('retirementCalcPercentageNeededYearly').innerHTML = '$' + totalYearly + ' (' + percentage + '%)' ;
        document.getElementById('retirementCalcPercentageNeededMonthly').innerHTML = '$' + totalMonthly + ' (' + percentage + '%)' ;
    }


    return (
        <div className="retirement-container">
             <h1>Retirement Calculator</h1>
             <div className="retirementContent">
                <div className="retirementTwoColumns">
                    <div className="retirementLeftColumn">
                    <h2 className="inputTitle">Calculate Money Needed for Retirement</h2>
                        <form id="retirementCalculator">
                        <div>
                            <h3>Current Age</h3>
                            <input
                                type="number"
                                name="currentAge"
                                value={currentAge}
                                min="0"
                                onChange={(e) => setCurrentAge(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3>Expected Retirement Age</h3>
                            <input 
                                type="number"
                                name="retirementAge"
                                value={retirementAge}
                                min="0"
                                onChange={(e) => setRetirementAge(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <h3>Assumed Life Expectancy</h3>
                            <input 
                                type="number"
                                name="lifeExpectancy"
                                value={lifeExpectancy}
                                min="0"
                                onChange={(e) => setLifeExpectancy(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3>Current Pre-tax Income</h3>
                            <input 
                                type="number"
                                name="pretaxIncome"
                                value={pretaxIncome}
                                onChange={(e) => setPretaxIncome(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3>Current Income Increase "%"</h3>
                            <input 
                                type="number"
                                name="incomeIncrease"
                                value={incomeIncrease}
                                onChange={(e) => setIncomeIncrease(e.target.value)}
                            />
                        </div>

                        
                        <div>
                            <h3>Percent of Income put into Savings "%"</h3>
                            <input 
                                id="bottomInput"
                                type="number"
                                name="investmentReturn"
                                value={moneySaved}
                                min="0"
                                onChange={(e) => setMoneySaved(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3>Current Savings for Retirement</h3>
                            <input 
                                type="number"
                                name="retirementSaving"
                                value={retirementSavings}
                                onChange={(e) => setRetirementSavings(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3>Expected Yearly Expenses After Retirement</h3>
                            <input 
                                type="number"
                                name="yearlyRetirementExpenses"
                                value={yearlyRetirementExpenses}
                                onChange={(e) => setYearlyRetirementExpenses(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3>Expectated Inflation Rate "%"</h3>
                            <input 
                                type="number"
                                name="expectedInflationRate"
                                value={expectedInflationRate}
                                onChange={(e) => setExpectedInflationRate(e.target.value)}
                            />
                        </div>
                            
                        
                        <button type="button" onClick={updateBackendAndCalculator}>Calculate Results</button>
                        </form>
                    </div>
                    
                    <div className ="retirementRightColumn">
                        <div>
                            <h3>Total Money Needed for Retirement</h3>
                            <label id="retirementCalcTotalAmount">$0</label>
                        </div>
                        <div>
                            <h3>Money Saved by retirement</h3>
                            <label id="retirementCalcMoneyInvested">$0</label>
                        </div>
                        
                        
                        <div>
                            <h3>Savings Still Needed for Retirement</h3>
                            <div className="retirementResultsBox">
                            <div>
                                <h3>Yearly</h3>
                                <label id="retirementCalcPercentageNeededYearly">$0</label>
                            </div>
                            <div>
                                <h3>Monthly</h3>
                                <label id="retirementCalcPercentageNeededMonthly">$0</label>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <style jsx>{`
                .retirement-container {
                    padding: 2rem;
                    max-width: 75%;
                    margin: 2rem auto;
                    background-color: white;
                    border-radius: 0.5rem;
                    color: #333;
                    position: relative;
                    z-index: 0;
                }
                
                .retirement-container h1 {
                    font-size: 1.875rem;
                    font-weight: 300;
                    text-align: center;
                    color: black;
                    margin-bottom: 30px;
                }

                h2 {
                    font-size: 2xl;
                    font-weight: 300;
                    color: #374151;
                    margin-bottom: 1.5rem;
                }

                .retirement-container h3,
                .retirementLeftColumn h3,
                .retirementRightColumn h3 {
                    font-size: 1rem;
                    color: #4B5563;
                    margin-bottom: 0.5rem;
                    font-weight: 400;
                }

                .retirementTwoColumns {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .retirementLeftColumn, .retirementRightColumn {
                    flex: 1;
                    min-width: 300px;
                    max-width: 100%;
                    background: #dbdbdb;
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                #retirementCalculator {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    padding: 1rem;
                }

                input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid #E5E7EB;
                    border-radius: 8px;
                    background-color: #ffffff;
                    font-size: 1rem;
                    transition: all 0.2s;
                }

                input:focus {
                    outline: none;
                    border-color: #69a289;
                    box-shadow: 0 0 0 3px rgba(105, 162, 137, 0.1);
                }

                button {
                    background-color: #69a289;
                    color: white;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 400;
                    cursor: pointer;
                    transition: all 0.2s;
                    width: 100%;
                    max-width: 300px;
                    margin: 2rem auto;
                }

                button:hover {
                    background-color: #558b73;
                }

                .retirementRightColumn {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .retirementRightColumn div {
                    background: #ffffff;
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    transition: all 0.2s ease;
                }

                .retirementRightColumn div:hover {
                    box-shadow: 0 2px 4px rgba(105, 162, 137, 0.1);
                    transform: translateY(-2px);
                }

                label {
                    display: block;
                    background-color: #edf2f7;
                    padding: 1rem;
                    border-radius: 8px;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #69a289;
                }

                .retirementResultsBox {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .retirementResultsBox div {
                    background: #edf2f7;
                    margin-bottom: 0;
                }
            `}</style>
    
    
        </div>
        
    )
}

export default RetirementPage;