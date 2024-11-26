import "./investment-landing.css";
import InvestmentFields from "../components/investment-fields/investment-fields.jsx";
import MarketPredictions from "../components/market-predictions/market-predictions.jsx";
import React, { useState, useEffect } from "react";
import {
  fetchInvestments,
  fetchInvestmentById,
  addInvestment,
  deleteInvestment as deleteInvestmentService,
  fetchAssets,
  addAsset,
  deleteAsset as deleteAssetService,
} from "../services/investmentService";

const InvestmentsLanding = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    type: "",
    allocation: 0,
    currentValue: 0,
  });
  const [investments, setInvestments] = useState([]);


  const [selectedInvestment, setSelectedInvestment] = useState(null);

  // do we need this? principal initial definitely isn't used
  const [newInvestment, setNewInvestment] = useState({
    type: "",
    principalInitial: 0,
    currentValue: 0,
  });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });

  // Fetch assets and investments from the backend
  useEffect(() => {
    const loadAssetsAndInvestments = async () => {
      try {
        const fetchedAssets = await fetchAssets();
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
    const totalValue = assets.reduce(
      (sum, asset) => sum + (asset.currentValue || 0),
      0
    );
    const newAssets = assets.map((asset) => ({
      ...asset,
      currentValue: (asset.allocation / 100) * totalValue,
    }));
    setAssets(newAssets);
  };

  const handleAddAsset = async (e) => {
    e.preventDefault();
    const { type, allocation, currentValue } = newAsset;

    if (!type || allocation < 0 || currentValue < 0) {
      console.error("Please fill in all fields with valid numbers.");
      return;
    }

    try {
      const response = await addAsset(newAsset);
      console.log(response);
      setAssets([...assets, response]);
      setNewAsset({ type: "", allocation: 0, currentValue: 0 });
    } catch (error) {
      console.error("Failed to add asset:", error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      const isDeleted = await deleteAssetService(id);
      if (isDeleted) {
        setAssets(assets.filter((asset) => asset.id !== id));
      } else {
        console.error("Failed to delete asset.");
      }
    } catch (error) {
      console.error("Failed to delete asset:", error);
    }
  };

  // handling add investment
  const handleAddInvestment = (newInvestment) => {
    setInvestments([...investments, newInvestment]);
  };

  // mapping so only certain attributes are displayed for each investment type
  const attributeMapping = {
    Stock: ["purchasePrice", "currentValue", "shares", "annualDividend"],
    Bond: ["faceValue", "couponRate", "pricePaid", "yearsToMaturity"],
    "Mutual Fund": ["startingNAV", "endingNAV", "dividends"],
    "Real Estate": [
      "initialInvestment",
      "netRentalIncome",
      "newPropertyValue",
      "originalPurchasePrice",
    ],
    Cryptocurrency: ["purchasePrice", "currentValue"],
    Retirement: ["purchasePrice", "currentValue"],
    CD: ["purchasePrice", "currentValue"],
    Savings: ["purchasePrice", "currentValue"],
  };

  // Handle finding an investment
  const handleFetchInvestmentById = async (id) => {
    try {
      const investment = await fetchInvestmentById(id);
      setSelectedInvestment(investment);
    } catch (error) {
      console.error("Failed to find investment:", error);
    }
  };

  // toggling the details button
  const handleDetailToggle = (id) => {
    // if an investment is already being displayed
    if (selectedInvestment != null) {
      // if it's a different investment, switch to the selected one
      if (selectedInvestment.id != id) {
        handleFetchInvestmentById(id);
      }
      // otherwise, toggle display off
      else {
        setSelectedInvestment(null);
      }
      // if display is currently null, display selected investment
    } else {
      handleFetchInvestmentById(id);
    }
  };

  // format the field names so add a space between camelCase and capitalize first letter
  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // format number to xx,xxx.xx
  const formatNumber = (number) => {
    return Number(number.toFixed(2)).toLocaleString();
  };

  // Handle deleting an investment
  const deleteInvestment = async (id) => {
    try {
      const isDeleted = await deleteInvestmentService(id);
      if (isDeleted) {
        setInvestments(
          investments.filter((investment) => investment.id !== id)
        );
      } else {
        console.error("Failed to delete investment.");
      }
    } catch (error) {
      console.error("Failed to delete investment:", error);
    }
  };

  // Total value calculation
  const totalValue = assets.reduce(
    (sum, asset) => sum + (asset.currentValue || 0),
    0
  );
  const totalIncome = investments.reduce(
    (sum, investment) => sum + (investment.returns || 0),
    0
  );
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="investments-container">
      <h1>Investments Management</h1>
      <div className="content">
        {/* Investments Section */}
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Investment</h2>
            <InvestmentFields
              newInvestment={newInvestment}
              setNewInvestment={setNewInvestment}
              setInvestments={setInvestments}
              addInvestment={addInvestment}
              investments={investments}
              onAddInvestment={handleAddInvestment}
            />
          </div>

          <div className="right-column">
            <h2>Investment List</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Returns ($)</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <React.Fragment key={investment.id}>
                    <tr>
                      <td>{investment.investmentName}</td>
                      <td>{investment.type}</td>
                      <td>${formatNumber(investment.returns) || 0}</td>
                      <td>
                        <button
                          onClick={() => deleteInvestment(investment.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDetailToggle(investment.id)}
                          className="details-btn"
                        >
                          More Details
                        </button>
                      </td>
                    </tr>
                    {selectedInvestment &&
                      selectedInvestment.id === investment.id && (
                        <tr className="investment-details">
                          <td colSpan="5">
                            {attributeMapping[selectedInvestment.type]?.map(
                              (field) => (
                                <p key={field}>
                                  {formatFieldName(field)}: $
                                  {formatNumber(selectedInvestment[field])}
                                </p>
                              )
                            )}
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <h3>Total Income: ${formatNumber(totalIncome)}</h3>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Asset</h2>
            <form onSubmit={handleAddAsset} className="asset-form">
              <input
                type="text"
                placeholder="Asset Type"
                value={newAsset.type}
                onChange={(e) =>
                  setNewAsset({ ...newAsset, type: e.target.value })
                }
              />
              <label htmlFor="allocation">Allocation:</label>
              <input
                type="number"
                placeholder="Enter Percentage"
                value={newAsset.allocation || ""}
                onChange={(e) =>
                  setNewAsset({
                    ...newAsset,
                    allocation: Number(e.target.value),
                  })
                }
              />
              <label htmlFor="currentValue">Current Value:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newAsset.currentValue || ""}
                onChange={(e) =>
                  setNewAsset({
                    ...newAsset,
                    currentValue: Number(e.target.value),
                  })
                }
              />
              <button type="submit" className="add-btn">
                Add Asset
              </button>
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
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td>{asset.type}</td>
                    <td>{asset.allocation}%</td>
                    <td>${formatNumber(asset.currentValue) || 0}</td>
                    <td>
                      <button
                        onClick={() => deleteAsset(asset.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Value: ${formatNumber(totalValue)}</h3>
          </div>
        </div>
        {/* Rebalance Button */}
        <div className="button-container">
          <button onClick={rebalance} className="rebalance-btn">
            Rebalance Portfolio
          </button>
        </div>

        <h2>Market Predictions</h2>
        <div>
          <MarketPredictions />
        </div>
        {/* Fetch market predictions */}
        {/* <table>
          <thead>
            <tr>
              <th>Asset Type</th>
              <th>Prediction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Property</td>
              <td>The future is bleak</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default InvestmentsLanding;
