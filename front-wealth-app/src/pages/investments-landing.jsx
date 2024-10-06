import "./investment-landing.css"
/*
import React, { useState } from 'react';
import axios from 'axios';
import { addInvestment } from '../services/investmentService';


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
  // const handleaddInvestment = (e) => {
  //   e.preventDefault();
  //   setInvestments([...investments, { ...newInvestment, id: investments.length + 1, amount: Number(newInvestment.amount) }]);
  //   setNewInvestment({ type: '', amount: '', returns: '' });
  // };

 // Retrieve the token
const token = localStorage.getItem('token');

const handleAddInvestment = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newInvestment.type || !newInvestment.amount || !newInvestment.returns) {
        console.error('Please fill in all fields.');
        return;
    }

    try {
        // Ensure token is available
        if (!token) {
            console.error('No token found. User might not be logged in.');
            return;
        }

        const response = await axios.post('http://localhost:8080/api/investments/create', newInvestment, {
            headers: {
                'Authorization': `Bearer ${token}`// Add your token here
                
            }
        });

        // Handle successful response
        if (response.status === 200 || response.status === 201) {
            setInvestments([...investments, { ...response.data, id: investments.length + 1 }]);
            setNewInvestment({ type: '', amount: '', returns: '' });
        } else {
            console.error('Failed to add investment:', response.statusText);
        }
    } catch (error) {
        // Detailed error handling
        if (error.response) {
            console.error('Error adding investment:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    }
};




  // Add and delete investment functionality
  // const handleAddInvestment = async (e) => {
  //   e.preventDefault();
  //   const response = await addInvestment(newInvestment);  // Call the service

  //   if (response) {
  //     setInvestments([...investments, { ...response, id: investments.length + 1 }]);
  //     setNewInvestment({ type: '', amount: '', returns: '' });
  //   } else {
  //     console.error('Failed to add investment.');
  //   }
  // };

  

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
        {/* Asset Allocation & Market Predictions */
        /*
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
*/
        {/* Add Investments and Expenses */}
        /*
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Investment</h2>
            <form onSubmit={handleAddInvestment} className="investment-form">
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
              </div> {/* end of row */
              /*
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Expected Returns"
                  value={newInvestment.returns}
                  onChange={(e) => setNewInvestment({ ...newInvestment, returns: e.target.value })}
                />
                <button type="submit" className="add-btn">Add Investment</button>
              </div> {/* end of row */
              /*
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
              </div> {/* end of row */
              /*
              <div className="form-row">
                <button type="submit" className="add-btn">Add Expense</button>
              </div> {/* end of row */
              /*
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

        {/* Rebalance Button */
        /*
        <div className="button-container">
          <button onClick={rebalance} className="rebalance-btn">
            Rebalance Portfolio
          </button>
        </div>
      </div>

      
      </div>
    );
  };
  */  
 
  import React, { useState, useEffect } from 'react';
  import {
    fetchInvestments,
    addInvestment,
    deleteInvestment as deleteInvestmentService,
    fetchAssetAllocations,
  } from '../services/investmentService';
  
  const InvestmentsLanding = () => {
    const [assets, setAssets] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [newInvestment, setNewInvestment] = useState({ type: '', principalInitial: 0, currentValue: 0 });
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ description: '', amount: '' });
  
    useEffect(() => {
      const loadAssetsAndInvestments = async () => {
        try {
          const fetchedAssets = await fetchAssetAllocations();
          const fetchedInvestments = await fetchInvestments();
          setAssets(fetchedAssets);
          setInvestments(fetchedInvestments);
        } catch (error) {
          console.error("Failed to fetch assets or investments:", error);
        }
      };
  
      loadAssetsAndInvestments();
    }, []);
  
    const rebalance = () => {
      const totalValue = assets.reduce((sum, asset) => sum + (asset.currentValue || 0), 0);
      const newAssets = assets.map(asset => ({
        ...asset,
        currentValue: (asset.allocation / 100) * totalValue,
      }));
      setAssets(newAssets);
    };
  
    const handleAddInvestment = async (e) => {
      e.preventDefault();
      const { type, principalInitial, currentValue } = newInvestment;
      console.log('initial value is: ', principalInitial);
      console.log('current value is: ', currentValue);
  
      if (!type || principalInitial <= 0 || currentValue <= 0) {
        console.error('Please fill in all fields with valid numbers.');
        return;
      }
  
      try {
        // Calculate returns directly in the frontend
        const calculatedReturns = currentValue - principalInitial;
        console.log('calculate return value is', calculatedReturns);
  
        // Add investment with the calculated returns
        const response = await addInvestment({ ...newInvestment, returns: calculatedReturns });
        setInvestments([...investments, { ...response, id: investments.length + 1 }]);
        setNewInvestment({ type: '', principalInitial: 0, currentValue: 0 }); // Reset fields
      } catch (error) {
        console.error('Failed to add investment:', error);
      }
    };
  
    const deleteInvestment = async (id) => {
      const isDeleted = await deleteInvestmentService(id);
      if (isDeleted) {
        setInvestments(investments.filter(investment => investment.id !== id));
      } else {
        console.error('Failed to delete investment.');
      }
    };
  
    const addExpense = (e) => {
      e.preventDefault();
      setExpenses([...expenses, { ...newExpense, id: expenses.length + 1, amount: Number(newExpense.amount) }]);
      setNewExpense({ description: '', amount: '' });
    };
  
    const deleteExpense = (id) => {
      setExpenses(expenses.filter(expense => expense.id !== id));
    };
  
    const totalValue = assets.reduce((sum, asset) => sum + (asset.currentValue || 0), 0);
    const totalIncome = investments.reduce((sum, investment) => sum + (investment.returns || 0), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
    return (
      <div className="investments-container">
        <h1>Investments Management</h1>
        <div className="content">
          {/* Asset Allocation */}
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
                    <td>${(asset.currentValue || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Value: ${totalValue.toFixed(2)}</h3>
          </div>
  
          {/* Add Investments and Expenses */}
          <div className="right-column">
            <h2>Investments</h2>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Principal Initial ($)</th>
                  <th>Returns ($)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {investments.map(investment => (
                  <tr key={investment.id}>
                    <td>{investment.type}</td>
                    <td>${(investment.principalInitial || 0).toFixed(2)}</td>
                    <td>${(investment.calculatedReturns || 0).toFixed(2)}</td>
                    <td>
                      <button onClick={() => deleteInvestment(investment.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form onSubmit={handleAddInvestment}>
              <input
                type="text"
                placeholder="Type"
                value={newInvestment.type}
                onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
              />
              <input
                type="number"
                placeholder="Initial Principal"
                value={newInvestment.principalInitial}
                onChange={(e) => setNewInvestment({ ...newInvestment, principalInitial: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Current Value"
                value={newInvestment.currentValue}
                onChange={(e) => setNewInvestment({ ...newInvestment, currentValue: Number(e.target.value) })}
              />
              <button type="submit">Add Investment</button>
            </form>
          </div>
  
          {/* Rebalance Button */}
          <div className="button-container">
            <button onClick={rebalance} className="rebalance-btn">
              Rebalance Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default InvestmentsLanding;
  
  
