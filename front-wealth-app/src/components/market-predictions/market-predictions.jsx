// a separate file for making market prediction graphs

import React, { useState, useEffect, useRef } from "react";
import regression from "regression";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  fetchMarketPredictions,
  fetchStockData,
} from "../../services/investmentService";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MarketPredictions = () => {
  const [stockSymbols, setStockSymbols] = useState(["", "", ""]);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const availableStocks = [
    "AAPL",
    "GOOG",
    "MSFT",
    "META",
    "ORCL",
    "ADBE",
    "IBM",
    "INTU",
    "TSLA",
  ];

  // predefined colors
  const predefinedColors = [
    "#2B5887", // blue
    "#DC3545", // red
    "#9640B5", // purple
    "#EEB53A", // yellow
    "#568A74", // green
  ];

  useEffect(() => {
    const fetchInitialMarketPredictions = async () => {
      try {
        const predictions = await fetchMarketPredictions();
        console.log("Fetched Market Predictions on load");
      } catch (err) {
        console.error("Error fetching market predictions on load:", err);
        setError("Failed to load market predictions.");
      }
    };

    fetchInitialMarketPredictions();
  }, []);

  // dropdown stock selection
  const handleStockChange = (index, newSymbol) => {
    const updatedSymbols = [...stockSymbols];
    updatedSymbols[index] = newSymbol;
    setStockSymbols(updatedSymbols);
  };

  // convert YYYY-MM-DD to numeric format
  const convertDatesToNumeric = (dates) => {
    return dates.map((date) => {
      const currentDate = new Date(date);
      return currentDate / 86400000;
    });
  };

  // fetching market data for selected stock
  useEffect(() => {
    const fetchMarketData = async () => {
      const datasets = [];
      let labels = [];

      // loop through the selected stocks and fetch data
      for (const symbol of stockSymbols) {
        // skip if symbol is empty
        if (!symbol) continue;
        try {
          // the actual fetching
          const data = await fetchStockData(symbol);

          // Log the fetched data
          // or testing only
          console.log("Fetched Data:", data);

          // combine dates and prices into pairs
          const dataPairs = data.map((point) => ({
            date: point.date,
            price: point.closingPrice,
          }));

          // sort the pairs by date
          dataPairs.sort((a, b) => new Date(a.date) - new Date(b.date));

          // extract sorted dates and prices
          const sortedDates = dataPairs.map((pair) => pair.date);
          const sortedPrices = dataPairs.map((pair) => pair.price);

          // perform line regression
          const numericDates = convertDatesToNumeric(sortedDates);
          const numericPairs = numericDates.map((x, i) => [x, sortedPrices[i]]);
          const regressionResult = regression.linear(numericPairs);

          // predict the next 5 days
          const futureDays = [...Array(7).keys()].map(
            (i) => numericDates[numericDates.length - 1] + i + 1
          );
          const predictions = futureDays.map((day) =>
            regressionResult.predict(day)
          );

          // combine historical with predicted dates
          const allDates = [
            ...sortedDates,
            ...futureDays.map(
              (d) => new Date(d * 86400000).toISOString().split("T")[0]
            ),
          ];

          const predictedPrices = [...predictions.map((p) => p[1])];
          const allPrices = [...sortedPrices, ...predictedPrices];

          // use dates as labels
          labels = allDates;

          // data points for graph
          datasets.push(
            // graph with solid line for past data
            {
              label: `${symbol}`,
              data: sortedPrices,
              borderColor: predefinedColors[stockSymbols.indexOf(symbol)],
              fill: false,
            },
            // graph with dotted line for predictions
            {
              label: `Predictions`,
              data: allPrices,
              borderColor: predefinedColors[stockSymbols.indexOf(symbol)],
              borderDash: [5, 5],
              fill: false,
            }
          );
        } catch (err) {
          console.error("Error fetching data for", symbol, err);
        }

        // destroy the previous chart instance if one already exists exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // if chartRef exists, render the chart with the new data
        if (chartRef.current) {
          chartInstance.current = new Chart(chartRef.current, {
            type: "line",
            data: {
              labels,
              datasets,
            },
          });
        }
      }
    };

    fetchMarketData();
  }, [stockSymbols]);
  // re-fetch data when stock symbols change

  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        {stockSymbols.map((symbol, index) => (
          <label key={index}>
            Stock {index + 1}:
            <select
              className="stockDropdown"
              value={symbol}
              onChange={(e) => handleStockChange(index, e.target.value)}
            >
              <option value="">Select Stock</option>
              {availableStocks.map((stock) => (
                <option key={stock} value={stock}>
                  {stock}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      {/* canvas element where the chart will be rendered */}
      <canvas ref={chartRef} className="chart-container"></canvas>
    </div>
  );
};

export default MarketPredictions;
