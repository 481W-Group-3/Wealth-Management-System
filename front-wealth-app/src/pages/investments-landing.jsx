import "./investment-landing.css"
import React, { useState, useEffect } from 'react';
import {
  fetchInvestments,
  addInvestment,
  deleteInvestment as deleteInvestmentService,
  fetchAssetAllocations,
  addAsset,
  deleteAsset as deleteAssetService
} from '../services/investmentService';

const InvestmentsLanding = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({ type: '', allocation: 0, currentValue: 0 });
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState({ type: '', principalInitial: 0, currentValue: 0 });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

  // Fetch assets and investments from the backend
  useEffect(() => {
    const loadAssetsAndInvestments = async () => {
      try {
        const fetchedAssets = await fetchAssetAllocations();
        const fetchedInvestments = await fetchInvestments();
        console.log(fetchedInvestments);
        console.log(fetchedAssets);
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

  const handleAddAsset = async (e) => {
    e.preventDefault();
    const { type, allocation, currentValue } = newAsset;

    if (!type || allocation <= 0 || currentValue <= 0) {
      console.error('Please fill in all fields with valid numbers.');
      return;
    }

    try {
      const response = await addAsset(newAsset);
      console.log(response);
      setAssets([...assets, response]);
      setNewAsset({ type: '', allocation: 0, currentValue: 0 });
    } catch (error) {
      console.error('Failed to add asset:', error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      const isDeleted = await deleteAssetService(id);
      if (isDeleted) {
        setAssets(assets.filter(asset => asset.id !== id));
      } else {
        console.error('Failed to delete asset.');
      }
    } catch (error) {
      console.error('Failed to delete asset:', error);
    }
  };

  // Submit handler for adding a new investment
  const handleAddInvestment = async (e) => {
    e.preventDefault();
    const { type, principalInitial, currentValue } = newInvestment;

    if (!type || principalInitial <= 0 || currentValue <= 0) {
      console.error('Please fill in all fields with valid numbers.');
      return;
    }

    try {
      // Send new investment to backend for calculation
      const response = await addInvestment(newInvestment);
      console.log(response);
      setInvestments([...investments, response]);
      setNewInvestment({ type: '', principalInitial: 0, currentValue: 0 });
    } catch (error) {
      console.error('Failed to add investment:', error);
    }
  };

  // Handle deleting an investment
  const deleteInvestment = async (id) => {
    try {
      const isDeleted = await deleteInvestmentService(id);
      if (isDeleted) {
        setInvestments(investments.filter(investment => investment.id !== id));
      } else {
        console.error('Failed to delete investment.');
      }
    } catch (error) {
      console.error('Failed to delete investment:', error);
    }
  };

  // Total value calculation
  const totalValue = assets.reduce((sum, asset) => sum + (asset.currentValue || 0), 0);
  const totalIncome = investments.reduce((sum, investment) => sum + (investment.returns || 0), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="investments-container">
      <h1>Investments Management</h1>
      <div className="content">
        {/* Asset Allocation */}
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Asset</h2>
            <form onSubmit={handleAddAsset} className="asset-form">
              <input
                type="text"
                placeholder="Asset Type"
                value={newAsset.type}
                onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
              />
              <input
                type="text"
                placeholder="Allocation"
                value={newAsset.allocation}
                onChange={(e) => setNewAsset({ ...newAsset, allocation: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Current Value"
                value={newAsset.currentValue}
                onChange={(e) => setNewAsset({ ...newAsset, currentValue: Number(e.target.value) })}
              />
              <button type="submit" className="add-btn">Add Asset</button>
            </form>
          </div>
          <div className="right-column">
            <h2>Asset Allocation</h2>
            <table>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Allocation (%)</th>
                  <th>Current Value ($)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assets.map(asset => (
                  <tr key={asset.id}>
                    <td>{asset.type}</td>
                    <td>{asset.allocation}%</td>
                    <td>${(asset.currentValue || 0).toFixed(2)}</td>
                    <td>
                      <button onClick={() => deleteAsset(asset.id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Value: ${totalValue.toFixed(2)}</h3>
          </div>
        </div>

        {/* Investments Section */}
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Investment</h2>
            <form onSubmit={handleAddInvestment} className="investment-form">
              <input
                type="text"
                placeholder="Investment Type"
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
              <button type="submit" className="add-btn">Add Investment</button>
            </form>
          </div>

          <div className="right-column">
            <h2>Investment List</h2>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Principal Initial ($)</th>
                  <th>Returns ($)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {investments.map(investment => (
                  <tr key={investment.id}>
                    <td>{investment.type}</td>
                    <td>${(investment.principalInitial || 0).toFixed(2)}</td>
                    <td>${(investment.returns || 0).toFixed(2)}</td>
                    <td>
                      <button onClick={() => deleteInvestment(investment.id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Income: ${totalIncome.toFixed(2)}</h3>
          </div>
        </div>

        {/* Rebalance Button */}
        <div className="button-container">
          <button onClick={rebalance} className="rebalance-btn">Rebalance Portfolio</button>
        </div>

        <h2>Market Predictions</h2>
        {/* Fetch market predictions */}
        <table>
          <thead>
            <tr>
              <th>Asset Type</th>
              <th>Prediction</th>
            </tr>
          </thead>
          <tbody>
            {/* Insert market prediction data here*/}
            <tr>
              <td>Property</td>
              <td>The future is bleak</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentsLanding;