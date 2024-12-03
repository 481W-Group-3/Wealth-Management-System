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
        console.log("output of fetched: " + fetchedVariables);
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
            console.log("fetched variables 2: "+ fetchedVariables);
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
                    padding: 20px;
                    max-width: 1200px;
                    min-width: 340px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 0.5rem;
                }
                
                .retirement-container h1{
                    font-size: 1.875rem;
                    font-weight: 300;
                }

                h1, h2, h3, h4 {
                    color: #333;
                    margin-bottom: 5px;
                    margin-top: 10px;
                    text-align: center;
                }

                div {
                    text-align:center;
                }
                
                .inputTitle{
                    text-align:center;
                    padding-top: 20px;
                }

                .retirementTwoColumns {
                    gap: 30px;
                    margin-bottom: 30px;
                    margin-left: 50px;
                    margin-right: 50px;
                }

                .retirementLeftColumn, .retirementRightColumn {
                    align-items: center;
                    border-style: solid;
                    border-radius: 5px;
                    border-width: 0;
                    min-height: 200px;
                    max-height: 2000px;
                    background-color: white;
                    box-shadow: 0 6px 50px rgba(0, 0, 0, 0.1);
                }

                .retirementRightColumn{
                    display:flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    padding-top: 10px;
                    justify-content: center;
                }

                .retirementRightColumn div{
                    margin-left: 5px;
                    margin-right: 5px;
                    width: 400px;
                    align-self: center;
                }

                #retirementCalculator{
                    display:flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    gap: 10px;
                    padding-bottom: 25px;
                    justify-content: center;
                }
                .retirmentLeftColumn form div {

                    padding-top: 10px;
                    align-self: center;
                    margin-left: 5px;
                    margin-right: 5px;
                }
                
                .retirementResultsBox{
                    text-align: center;
                    max-width: 400px;
                    min-width: 180px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .retirementResultsBox h3{
                    width: 100%;
                }

                .retirementResultsBox div{
                    width: 160px;
                }
                
                input, button, label{
                border-radius: 4px;
                    padding-left: 70px;
                    padding-right: 70px;
                    padding-top: 7.5px;
                    padding-bottom: 7.5px;
                }

                input {
                    border-style: solid;
                    border-color: gray;
                    background-color: lightblue;
                }

                #bottonInput {
                    margin-bottom:5px;
                }

                label {
                    text-align: center;
                    background-color: lightblue;
                    margin-bottom: 20px;
                }
                
                button {
                background-color: #2b5887;
                color: white;
                margin-top: 30px;
                }

                h1{
                background-color: white;
                border-radius: 5px;
                border-style: solid;
                border-width: 0;
                width: 600px;
                place-self: center;
                }

            `}</style>
    
    
        </div>
        
    )
}

export default RetirementPage;