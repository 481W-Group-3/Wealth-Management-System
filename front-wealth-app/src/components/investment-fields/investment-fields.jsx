import React from "react";

// a separate page for the investment fields because there's a lot of them

const InvestmentFields = ({
  newInvestment,
  setNewInvestment,
  setInvestments,
  addInvestment,
  investments,
  onAddInvestment,
}) => {
  const handleInputChange = (field, value) => {
    setNewInvestment((prev) => ({ ...prev, [field]: value }));
  };

  // list of investment types with purchase price
  const typesWithPurchasePriceAndCurrentValue = [
    "Stock",
    "Cryptocurrency",
    "Retirement",
    "CD",
    "Savings",
  ];
  // submit handler for adding a new investment
  const handleAddInvestment = async (e) => {
    e.preventDefault();

    // will need to add name field here
    const {
      investmentName,
      type,
      purchasePrice,
      currentValue,
      ...investmentDetails
    } = newInvestment;

    // validate input based on the type of investment
    switch (type) {
      case "Stock":
        const { shares, annualDividend } = investmentDetails;
        if (
          purchasePrice < 0 ||
          currentValue < 0 ||
          shares < 0 ||
          annualDividend < 0
        ) {
          console.error("Please provide valid values for all Stock fields.");
          return;
        }
        break;
      case "Bond":
        const { faceValue, couponRate, pricePaid, yearsToMaturity } =
          investmentDetails;
        if (
          faceValue < 0 ||
          couponRate < 0 ||
          pricePaid < 0 ||
          yearsToMaturity < 0
        ) {
          console.error("Please provide valid values for all Bond fields.");
          return;
        }
        break;
      case "Mutual Fund":
        const { startingNAV, endingNAV, dividends } = investmentDetails;
        if (startingNAV < 0 || endingNAV < 0 || dividends < 0) {
          console.error(
            "Please provide valid values for all Mutual Fund fields."
          );
          return;
        }
        break;
      case "Real Estate":
        const {
          initialInvestment,
          netRentalIncome,
          newPropertyValue,
          originalPurchasePrice,
        } = investmentDetails;
        if (
          initialInvestment < 0 ||
          netRentalIncome < 0 ||
          newPropertyValue < 0 ||
          originalPurchasePrice < 0
        ) {
          console.error(
            "Please provide valid values for all Real Estate fields."
          );
          return;
        }
        break;
      case "Cryptocurrency":
      case "Retirement":
      case "CD":
      case "Savings":
        if (purchasePrice < 0 || currentValue < 0) {
          console.error("Please provide valid values for all fields.");
          return;
        }
        break;

      default:
        console.error("Unknown investment type. Please select a valid type.");
        return;
    }

    try {
      // send new investment to backend for calculation
      const response = await addInvestment(newInvestment);
      console.log(response);
      setInvestments([...investments, response]);

      // set new investment attributes based on the type
      switch (type) {
        case "Stock":
          setNewInvestment({
            name: "",
            type: "Stock",
            purchasePrice: 0,
            currentValue: 0,
            shares: 0,
            annualDividend: 0,
          });
          break;
        case "Bond":
          setNewInvestment({
            name: "",
            type: "Bond",
            faceValue: 0,
            couponRate: 0,
            pricePaid: 0,
            yearsToMaturity: 0,
          });
          break;
        case "Mutual Fund":
          setNewInvestment({
            name: "",
            type: "Mutual Fund",
            startingNAV: 0,
            endingNAV: 0,
            dividends: 0,
          });
          break;
        case "Real Estate":
          setNewInvestment({
            name: "",
            type: "Real Estate",
            initialInvestment: 0,
            netRentalIncome: 0,
            newPropertyValue: 0,
            originalPurchasePrice: 0,
          });
          break;
        case "Cryptocurrency":
          setNewInvestment({
            name: "",
            type: "Cryptocurrency",
            purchasePrice: 0,
            currentValue: 0,
          });
          break;
        case "Retirement":
          setNewInvestment({
            name: "",
            type: "Retirement",
            purchasePrice: 0,
            currentValue: 0,
          });
          break;
        case "CD":
          setNewInvestment({
            name: "",
            type: "CD",
            purchasePrice: 0,
            currentValue: 0,
          });
          break;
        case "Savings":
          setNewInvestment({
            name: "",
            type: "Savings",
            purchasePrice: 0,
            currentValue: 0,
          });
          break;
        default:
          setNewInvestment({ type: "", principalInitial: 0, currentValue: 0 }); // default fallback
      }
    } catch (error) {
      console.error("Failed to add investment:", error);
    }
  };
  return (
    <>
      <div className="left-column">
        <form onSubmit={handleAddInvestment}>
          {/* input for investment name  */}
          <input
            type="text"
            placeholder="Investment Name"
            value={newInvestment.investmentName || ""}
            onChange={(e) =>
              handleInputChange("investmentName", e.target.value)
            }
          />

          {/* drop down list for different investment types  */}
          <select
            className="typeDropDown"
            value={newInvestment.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
          >
            <option value="" disabled>
              Select Investment Type
            </option>
            <option value="Stock">Stock</option>
            <option value="Bond">Bond</option>
            <option value="Mutual Fund">Mutual Fund</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Retirement">Retirement</option>
            <option value="CD">CD</option>
            <option value="Savings">Savings</option>
          </select>

          {/* fields for purchase price and current value, used by multiple investment types  */}
          {typesWithPurchasePriceAndCurrentValue.includes(
            newInvestment.type
          ) && (
            <>
              <label htmlFor="purchasePrice">Purchase Price:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.purchasePrice || ""}
                onChange={(e) =>
                  handleInputChange("purchasePrice", Number(e.target.value))
                }
              />
              <label htmlFor="currentValue">Current Value:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.currentValue || ""}
                onChange={(e) =>
                  handleInputChange("currentValue", Number(e.target.value))
                }
              />
            </>
          )}

          {/* input fields for stock */}
          {newInvestment.type === "Stock" && (
            <>
              <label htmlFor="shares">Shares:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.shares || ""}
                onChange={(e) =>
                  handleInputChange("shares", Number(e.target.value))
                }
              />
              <label htmlFor="annualDividend">Annual Dividend:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.annualDividend || ""}
                onChange={(e) =>
                  handleInputChange("annualDividend", Number(e.target.value))
                }
              />
            </>
          )}

          {/* input fields for bond */}
          {newInvestment.type === "Bond" && (
            <>
              <label htmlFor="faceValue">Face Value:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.faceValue || ""}
                onChange={(e) =>
                  handleInputChange("faceValue", Number(e.target.value))
                }
              />
              <label htmlFor="couponRate">Coupon Rate:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.couponRate || ""}
                onChange={(e) =>
                  handleInputChange("couponRate", Number(e.target.value))
                }
              />
              <label htmlFor="pricePaid">Price Paid:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.pricePaid || ""}
                onChange={(e) =>
                  handleInputChange("pricePaid", Number(e.target.value))
                }
              />
              <label htmlFor="yearsToMaturity">Years to Maturity:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.yearsToMaturity || ""}
                onChange={(e) =>
                  handleInputChange("yearsToMaturity", Number(e.target.value))
                }
              />
            </>
          )}

          {/* input fields for mutual fund */}
          {newInvestment.type === "Mutual Fund" && (
            <>
              <label htmlFor="startingNAV">Starting NAV:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.startingNAV || ""}
                onChange={(e) =>
                  handleInputChange("startingNAV", Number(e.target.value))
                }
              />
              <label htmlFor="endingNAV">Ending NAV:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.endingNAV || ""}
                onChange={(e) =>
                  handleInputChange("endingNAV", Number(e.target.value))
                }
              />
              <label htmlFor="dividends">Dividends:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.dividends || ""}
                onChange={(e) =>
                  handleInputChange("dividends", Number(e.target.value))
                }
              />
            </>
          )}

          {/* input fields for real estate */}
          {newInvestment.type === "Real Estate" && (
            <>
              <label htmlFor="initialInvestment">Initial Investment:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.initialInvestment || ""}
                onChange={(e) =>
                  handleInputChange("initialInvestment", Number(e.target.value))
                }
              />
              <label htmlFor="netRentalIncome">Net Rental Income:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.netRentalIncome || ""}
                onChange={(e) =>
                  handleInputChange("netRentalIncome", Number(e.target.value))
                }
              />
              <label htmlFor="newPropertyValue">New Property Value:</label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.newPropertyValue || ""}
                onChange={(e) =>
                  handleInputChange("newPropertyValue", Number(e.target.value))
                }
              />
              <label htmlFor="originalPurchasePrice">
                Original Purchase Price:
              </label>
              <input
                type="number"
                placeholder="Enter Value"
                value={newInvestment.originalPurchasePrice || ""}
                onChange={(e) =>
                  handleInputChange(
                    "originalPurchasePrice",
                    Number(e.target.value)
                  )
                }
              />
            </>
          )}
          <button type="submit" className="add-btn">
            Add Investment
          </button>
        </form>
      </div>
    </>
  );
};

export default InvestmentFields;
