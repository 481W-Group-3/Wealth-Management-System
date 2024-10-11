import React, { useState } from 'react';

const RetirementPage = () => {

    const [currentAge, setCurrentAge] = useState('');
    const [retirementAge, setRetirementAge] = useState('');
    const [lifeExpectancy, setLifeExpectancy] = useState('');
    const [pretaxIncome, setPretaxIncome] = useState('');
    const [incomeIncrease, setIncomeIncrease] = useState('');
    const [yearlyRetirementExpenses, setYearlyRetirementExpenses] = useState('');
    const [expectedInflationRate, setExpectedInflationRate] = useState('');
    const [moneySaved, setMoneySaved] = useState('');
    const [retirementSavings, setRetirementSavings] = useState('');


    const retirementCalculator = () => {
        
        let preparationTime = retirementAge - currentAge;
        let retirementDuration = lifeExpectancy - retirementAge;

        let savings = retirementSavings;
        let income = pretaxIncome * incomeIncrease;
        let inflation = expectedInflationRate;
        for(let i=1; i<preparationTime;i++){
            savings = savings + (income * (1 + (moneySaved /100))); 
            income = income * incomeIncrease;
            inflation = inflation * expectedInflationRate;
        }
        let adjustedAnnualExpenses = yearlyRetirementExpenses * inflation;;
        for(let i=1; i<retirementDuration; i++){
            inflation = inflation * expectedInflationRate;
            adjustedAnnualExpenses = adjustedAnnualExpenses * inflation;
        }
        
        calculationTotalAmount(adjustedAnnualExpenses);
        calculationMoneyInvested(savings);
        calculationPercentageNeeded(adjustedAnnualExpenses, savings, preparationTime);
    }

    //Set total needed for retirement
    const calculationTotalAmount = (total) => {
        //document.getElementById('retirementCalcTotalAmount').innerHTML = '$' + total;
    }

    //Set money saved for retirement
    const calculationMoneyInvested = (total) => {
        //document.getElementById('retirementCalcMoneyInvested').innerHTML = '$' + total;
    }

    //Set percentage still needed for retirement
    const calculationPercentageNeeded = (expenses, savings, time) => {
        let percentage = (savings / expenses) * 100; 
        let total = (expenses - savings) / time;
        //document.getElementById('retirementCalcPercentageNeeded').innerHTML = '$' + total + ' (' + percentage + ')' ;
    }

    return (
        <div className="retirement-container">
             <h1>Retirement Calculator</h1>
             <div className="retirementContent">
                <div className="retirementTwoColumns">
                    <div className="retirementLeftColumn">
                        <h2>Calculate Money Needed for Retirement</h2>
                        <form onClick={retirementCalculator}>
                            <h3>Current Age</h3>
                            <input
                                type="number"
                                name="currentAge"
                                value={currentAge}
                                onChange={(e) => setCurrentAge(e.target.value)}
                            />
                            <h3>Expected Retirement Age</h3>
                            <input 
                                type="number"
                                name="retirementAge"
                                value={retirementAge}
                                onChange={(e) => setRetirementAge(e.target.value)}
                            />
                            <h3>Assumed Life Expectancy</h3>
                            <input 
                                type="number"
                                name="lifeExpectancy"
                                value={lifeExpectancy}
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
                            <h3>Percentage of Income put into Savings "%"</h3>
                            <input 
                                type="number"
                                name="investmentReturn"
                                value={moneySaved}
                                onChange={(e) => setMoneySaved(e.target.value)}
                            />
                            <br />
                            
                        </form>
                    </div>
                    <div className ="retirementRightColumn">
                        <h3>Total Money Needed for Retirement</h3>
                        <label id="retirementCalcTotalAmount">$0</label>
                        <br />
                        <h3>Money Saved by retirement</h3>
                        <label id="retirementCalcMoneyInvested">$0</label>
                        <h3>Yearly Savings Still Needed for Retirement</h3>
                        <label id="retirementCalcPercentageNeeded">$0</label>
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
                    margin-bottom: 20px;
                    text-align: center;
                }

                div {
                text-align:center;
                }

                .retirementTwoColumns {
                     display: flex;
                     gap: 30px;
                     margin-bottom: 30px;
                }

                .retirementLeftColumn, .retirementRightColumn {
                    flex: 1;
                }

                .retirementRightColumn{
                    margin-top: 300px;
                }

                input {
                    border-style: solid;
                    border-radius: 2px;
                    border-color: gray;
                    text-align: center;
                    background-color: lightblue;
                    margin-bottom: 10px;
                }

                label {
                    text-align: center;
                    background-color: lightblue;
                    margin-bottom: 20px;
                    padding-left: 80px;
                    padding-right: 80px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                }

            `}</style>
    
    
        </div>
        
    )
}

export default RetirementPage;