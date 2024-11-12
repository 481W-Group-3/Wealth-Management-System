import React, { useState } from 'react';
import FormsForDashboard from '../components/user/FormsForDashboard';

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
        let adjustedAnnualExpenses = yearlyRetirementExpenses * inflation;;
        for(let i=0; i<retirementDuration; i++){
            inflation = inflation * percentInflation;
            adjustedAnnualExpenses = adjustedAnnualExpenses + (adjustedAnnualExpenses * inflation);
        }
        
        calculationTotalAmount(adjustedAnnualExpenses);
        calculationMoneyInvested(savings);
        calculationPercentageNeeded(adjustedAnnualExpenses, savings, preparationTime);
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
        if(percentage == null){
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
                    <h2>Calculate Money Needed for Retirement</h2>
                        <form id="retirementCalculator">
                        <div className="moneyForRetirementLeftColumn">
                            <h3>Current Age</h3>
                            <input
                                type="number"
                                name="currentAge"
                                value={currentAge}
                                min="0"
                                onChange={(e) => setCurrentAge(e.target.value)}
                            />
                            <h3>Expected Retirement Age</h3>
                            <input 
                                type="number"
                                name="retirementAge"
                                value={retirementAge}
                                min="0"
                                onChange={(e) => setRetirementAge(e.target.value)}>
                            </input>
                            <h3>Assumed Life Expectancy</h3>
                            <input 
                                type="number"
                                name="lifeExpectancy"
                                value={lifeExpectancy}
                                min="0"
                                onChange={(e) => setLifeExpectancy(e.target.value)}
                            />
                            <h3>Current Pre-tax Income</h3>
                            <input 
                                type="number"
                                name="pretaxIncome"
                                value={pretaxIncome}
                                onChange={(e) => setPretaxIncome(e.target.value)}
                            />
                            <h3>Current Income Increase "%"</h3>
                            <input 
                                type="number"
                                name="incomeIncrease"
                                value={incomeIncrease}
                                onChange={(e) => setIncomeIncrease(e.target.value)}
                            />
                            
                        </div>
                        <div className="moneyForRetirementRightColumn">
                            <h3>Percent of Income put into Savings "%"</h3>
                            <input 
                                id="bottomInput"
                                type="number"
                                name="investmentReturn"
                                value={moneySaved}
                                min="0"
                                onChange={(e) => setMoneySaved(e.target.value)}
                            />
                            <h3>Current Savings for Retirement</h3>
                            <input 
                                type="number"
                                name="retirementSaving"
                                value={retirementSavings}
                                onChange={(e) => setRetirementSavings(e.target.value)}
                            />
                            <br />
                            <h3>Expected Yearly Expenses After Retirement</h3>
                            <input 
                                type="number"
                                name="yearlyRetirementExpenses"
                                value={yearlyRetirementExpenses}
                                onChange={(e) => setYearlyRetirementExpenses(e.target.value)}
                            />
                            <h3>Expectated Inflation Rate "%"</h3>
                            <input 
                                type="number"
                                name="expectedInflationRate"
                                value={expectedInflationRate}
                                onChange={(e) => setExpectedInflationRate(e.target.value)}
                            />
                            <br />
                            <button type="button" onClick={retirementCalculator}>Calculate Results</button>
                        </div>
                        </form>
                    </div>
                    <div className ="retirementRightColumn">
                        <h3>Total Money Needed for Retirement</h3>
                        <label id="retirementCalcTotalAmount">$0</label>
                        
                        <h3>Money Saved by retirement</h3>
                        <label id="retirementCalcMoneyInvested">$0</label>
                        
                        <h3>Savings Still Needed for Retirement</h3>
                        <div className="retirementResultsBox">
                            <h3>Yearly</h3>
                            <label id="retirementCalcPercentageNeededYearly">$0</label>
                            <h3>Monthly</h3>
                            <label id="retirementCalcPercentageNeededMonthly">$0</label>

                        </div>
                    </div>
                </div>
            </div>
    
            <style jsx>{`
                .retirement-contained {
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
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

                .retirementTwoColumns {
                     display: flex;
                     gap: 30px;
                     margin-bottom: 30px;
                    margin-left: 50px;
                    margin-right: 50px;
                }

                .retirementLeftColumn, .retirementRightColumn {
                    flex: 1;
                    align-items: center;
                    border-style: solid;
                    border-radius: 5px;
                    border-width: 3px;
                    height: 500px;
                    box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 20px;
                }

                #retirementCalculator{
                    display:flex;
                    gap: 30px;
                    padding-bottom: 25px;
                }
                .retirmentLeftColumn form div {
                    flex: 1;
                    align-items: center;
                }

                .retirementRightColumn{
                    padding-top: 100px;
                }

                .moneyForRetirementLeftColumn{
                padding-left: 10px;
                }
                .moneyForRetirementRightColumn {
                    margin-top: 0;              
                    padding-right: 10px;
                }

                .retirementResultsBox{
                    flex:2;
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

            `}</style>
    
    
        </div>
        
    )
}

export default RetirementPage;