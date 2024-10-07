import React, { useState } from 'react';

const RetirementPage = () => {

    const [currentAge, setCurrentAge] = useState([]);
    const [retirementAge, setRetirementAge] = useState([]);
    const [lifeExpectancy, setLifeExpectancy] = useState([]);
    const [pretaxIncome, setPretaxIncome] = useState([]);
    const [incomeIncrease, setIncomeIncrease] = useState([]);
    const [yearlyRetirementExpenses, setYearlyRetirementExpenses] = useState([]);
    const [expectedInflationRate, setExpectedInflationRate] = useState([]);
    const [investmentReturn, setInvestmentReturn] = useState([]);

    //retirment calculator
    //include assets, properties, etc
    //appreciate in value for however long
    //Maybe we should have 401k and roth IRA as they may grow more safely than real estate.
    //Look into the backend to see what components are expected to be included within this page.
    //asset investment, property in backend, with investment being important.

    const retirementCalculator = () => {
        let total = 0;
        let preparationTime = retirementAge - currentAge;
        let retirementDuration = lifeExpectancy - retirementAge;

        for(let i=0; i<preparationTime;i++){
            //income * 1.03
        }
        let adjustedAnnualExpenses
        for(let i=0; i<retirementDuration; i++){
            adjustedAnnualExpenses = adjustedAnnualExpenses + (annualExpenses - guaranteedIncome)
        }
        
       total = adjAnnualExpenses;
       calculationLabel(total);
    }

    //Set total needed for retirement
    const calculationLabel = (total) => {
            document.getElementById('retirementCalcTotalAmount').innerHTML = '$' + total;
    }

    return (
        <div className="retirement-container">
             <h1>Retirement Calculator</h1>
             <div className="content">
                <div className="twoColumns">
                    <div className="leftColumn">
                        <h2>Calculate Money Needed for Retirement</h2>
                        <form onSubmit={addProperty}>
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
                            <h3>Average Investment Return "%"</h3>
                            <input 
                                type="number"
                                name="investmentReturn"
                                value={investmentReturn}
                                onChange={(e) => setInvestmentReturn(e.target.value)}
                            />
                            <button type="submit">Calculate</button>
                            
                        </form>
                    </div>
                    <div>
                        <label id="retirementCalcTotalAmount">$0</label>
                    </div>
                </div>
             </div>
    
    
    
    
        </div>
    )
}

export default RetirementPage;