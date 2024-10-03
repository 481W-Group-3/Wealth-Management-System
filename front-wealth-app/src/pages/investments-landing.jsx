import React, { useState } from 'react';

const InvestmentsLanding = () => {
  // Initial state for assets allocation
  const [assets, setAssets] = useState([
    { id: 1, type: 'Stocks', allocation: 60, currentValue: 6000 },
    { id: 2, type: 'Bonds', allocation: 30, currentValue: 3000 },
    { id: 3, type: 'Real Estate', allocation: 10, currentValue: 1000 }
  ]);
  
  // State for market predictions
  const [marketPredictions, setMarketPredictions] = useState([
    { id: 1, type: 'Stocks', prediction: 'Positive' },
    { id: 2, type: 'Bonds', prediction: 'Stable' },
    { id: 3, type: 'Real Estate', prediction: 'Negative' }
  ]);

  // State for investments and expenses
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({ type: '', amount: '', returns: '' });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

  // Rebalance function for assets allocation
  const rebalance = () => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    const newAssets = assets.map(asset => ({
      ...asset,
      currentValue: (asset.allocation / 100) * totalValue
    }));
    setAssets(newAssets);
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);

  // Add and delete investment functionality
  const addInvestment = (e) => {
    e.preventDefault();
    setInvestments([...investments, { ...newInvestment, id: investments.length + 1, amount: Number(newInvestment.amount) }]);
    setNewInvestment({ type: '', amount: '', returns: '' });
  };

  const deleteInvestment = (id) => {
    setInvestments(investments.filter(investment => investment.id !== id));
  };

  // Add and delete expense functionality
  const addExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1, amount: Number(newExpense.amount) }]);
    setNewExpense({ description: '', amount: '' });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalIncome = investments.reduce((sum, investment) => sum + investment.returns, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="investments-container">
      <h1>Investments Management</h1>

      <div className="content">
        {/* Asset Allocation & Market Predictions */}
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Asset Allocation</h2>
            <table>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Allocation (%)</th>
                  <th>Current Value ($)</th>
                </tr>
              </thead>
              <tbody>
                {assets.map(asset => (
                  <tr key={asset.id}>
                    <td>{asset.type}</td>
                    <td>{asset.allocation}%</td>
                    <td>${asset.currentValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Value: ${totalValue}</h3>
          </div>
          <div className="right-column">
            <h2>Market Predictions</h2>
            <table>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Prediction</th>
                </tr>
              </thead>
              <tbody>
                {marketPredictions.map(prediction => (
                  <tr key={prediction.id}>
                    <td>{prediction.type}</td>
                    <td>{prediction.prediction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Investments and Expenses */}
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Investment</h2>
            <form onSubmit={addInvestment} className="investment-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Investment Type"
                  value={newInvestment.type}
                  onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newInvestment.amount}
                  onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
                />
              </div> {/* end of row */}
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Expected Returns"
                  value={newInvestment.returns}
                  onChange={(e) => setNewInvestment({ ...newInvestment, returns: e.target.value })}
                />
                <button type="submit" className="add-btn">Add Investment</button>
              </div> {/* end of row */}
            </form>
          </div>

          <div className="right-column">
            <h2>Investment List</h2>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Returns</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {investments.map(investment => (
                  <tr key={investment.id}>
                    <td>{investment.type}</td>
                    <td>${investment.amount}</td>
                    <td>${investment.returns}</td>
                    <td>
                      <button onClick={() => deleteInvestment(investment.id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Income: ${totalIncome}</h3>
          </div>
        </div>

        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Expense</h2>
            <form onSubmit={addExpense} className ="expense-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div> {/* end of row */}
              <div className="form-row">
                <button type="submit" className="add-btn">Add Expense</button>
              </div> {/* end of row */}
            </form>
          </div>

          <div className="right-column">
            <h2>Expense List</h2>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>${expense.amount}</td>
                    <td>
                      <button onClick={() => deleteExpense(expense.id)} className="delete-btn">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Expenses: ${totalExpenses}</h3>
          </div>
        </div>

        {/* Rebalance Button */}
        <div className="button-container">
          <button onClick={rebalance} className="rebalance-btn">
            Rebalance Portfolio
          </button>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .investments-container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        h1, h2, h3 {
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 1);
        }
        .two-column-layout {
            display: flex;
            gap: 30px;
            margin-bottom: 30px;
        }
        .left-column, .right-column {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;  
        }
        input {
            border-radius: 5px;
            border: 1px solid black;
            padding: 5px 10px;
            width: 100%;
        }
        .investment-form .form-row, .expense-form .form-row {
            margin-bottom: 10px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        .investment-form, .expense-form {
            width: 100%;
            align-items: center;  
            max-width: 400px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        .button-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        button {
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .add-btn {
            background-color: #2B5887;
        }
        .add-btn:hover {
            background-color: #366EAB;
        }
        .delete-btn {
            background-color: #dc3545;
        }
        .delete-btn:hover {
            background-color: #c82333;
        }
        .rebalance-btn {
            background-color: #1C732F;
        }
    
        .rebalance-btn:hover {
            background-color: #24943C;
        }
        `}</style>
      </div>
    );
  };
          
  export default InvestmentsLanding;









