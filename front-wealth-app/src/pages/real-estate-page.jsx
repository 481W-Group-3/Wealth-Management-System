import React, { useState, useEffect } from 'react';
import { getPropertyList, addNewProperty } from '../services/real-estate-service';
const RealEstatePage = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ address: '' });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });
  const [newLease, setNewLease] = useState({ startDate: '', endDate: '', tenantName: '', rentCollectionDay: '' });
  const [viewingLeaseForProperty, setViewingLeaseForProperty] = useState(null);
  const [editingLease, setEditingLease] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await getPropertyList();
      if (response.success !== false) {
        setProperties(response); 
      } else {
        console.error(response.message);
      }
    };
    fetchProperties(); 
  }, []);

  const addProperty = async (e) => {
    e.preventDefault();
    const addedProperty = await addNewProperty(newProperty);
    if (addedProperty.success !== false) {
      // Add the newly created property to the local state
      setProperties([...properties, addedProperty]);
      setNewProperty({ address: '', city: '', state: '', zipCode: '', taxMonthly: 0, insuranceMonthly: 0, mortgageMonthly: 0, type: '' });
    } else {
      console.error(addedProperty.message);
    }
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  const addExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1, amount: Number(newExpense.amount) }]);
    setNewExpense({ description: '', amount: '' });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const toggleLeaseView = (propertyId) => {
    setViewingLeaseForProperty(prevId => prevId === propertyId ? null : propertyId);
    setEditingLease(null);
  };

  const startEditingLease = (propertyId, lease) => {
    setEditingLease({ propertyId, ...lease });
    setNewLease(lease);
  };

  const cancelEditingLease = () => {
    setEditingLease(null);
    setNewLease({ startDate: '', endDate: '', tenantName: '', rentCollectionDay: '' });
  };

  const addOrUpdateLease = (propertyId) => {
    const updatedProperties = properties.map(property => {
      if (property.id === propertyId) {
        let updatedLeases;
        if (editingLease) {
          updatedLeases = property.leases.map(lease => 
            lease.id === editingLease.id ? { ...newLease, id: lease.id } : lease
          );
        } else {
          const newLeaseWithId = { ...newLease, id: property.leases.length + 1, isActive: true };
          updatedLeases = [...property.leases, newLeaseWithId];
        }
        return {
          ...property,
          leases: updatedLeases,
          occupied: true
        };
      }
      return property;
    });
    setProperties(updatedProperties);
    setNewLease({ startDate: '', endDate: '', tenantName: '', rentCollectionDay: '' });
    setEditingLease(null);
  };

  const deleteLease = (propertyId, leaseId) => {
    const updatedProperties = properties.map(property => {
      if (property.id === propertyId) {
        const updatedLeases = property.leases.filter(lease => lease.id !== leaseId);
        return {
          ...property,
          leases: updatedLeases,
          occupied: updatedLeases.some(lease => lease.isActive)
        };
      }
      return property;
    });
    setProperties(updatedProperties);
  };

  const getLeaseExpirationColor = (endDate) => {
    const today = new Date();
    const expirationDate = new Date(endDate);
    const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiration <= 30) {
      return 'rgba(255, 0, 0, 0.2)';
    } else if (daysUntilExpiration <= 60) {
      return 'rgba(255, 165, 0, 0.2)';
    }
    return '';
  };

  const totalIncome = properties.reduce((sum, property) => sum + property.rent, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="real-estate-container">
      <h1>Real Estate Management</h1>
      
      <div className="content">
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Property</h2>
            <form onSubmit={addProperty}>
              <input
                type="text"
                placeholder="Address"
                value={newProperty.address}
                onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
              />
              <input
                type="number"
                placeholder="Rent"
                value={newProperty.rent}
                onChange={(e) => setNewProperty({...newProperty, rent: e.target.value})}
              />
              <label>
                <input
                  type="checkbox"
                  checked={newProperty.occupied}
                  onChange={(e) => setNewProperty({...newProperty, occupied: e.target.checked})}
                />
                Occupied
              </label>
              <button type="submit">Add Property</button>
            </form>
          </div>
          <div className="right-column">
            <h2>Property List</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Rent</th>
                    <th>Status</th>
                    <th>Lease Info</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <React.Fragment key={property.id}>
                      <tr style={{ backgroundColor: property.leases.length > 0 ? getLeaseExpirationColor(property.leases[property.leases.length - 1].endDate) : '' }}>
                        <td>{property.address}</td>
                        <td>${property.rent}</td>
                        <td>{property.occupied ? 'Occupied' : 'Vacant'}</td>
                        <td>
                          <button onClick={() => toggleLeaseView(property.id)}>
                            {viewingLeaseForProperty === property.id ? 'Hide Leases' : 'View Leases'}
                          </button>
                        </td>
                        <td>
                          <button onClick={() => deleteProperty(property.id)} className="delete-btn">
                            Delete
                          </button>
                        </td>
                      </tr>
                      {viewingLeaseForProperty === property.id && (
                        <tr>
                          <td colSpan="5" className="lease-details-cell">
                            <h3 className="lease-header-highlight">Leases for {property.address}</h3>
                            <div className="lease-list">
                              {property.leases.map(lease => (
                                <div key={lease.id} className="lease-info">
                                  {editingLease && editingLease.id === lease.id ? (
                                    <form onSubmit={(e) => { e.preventDefault(); addOrUpdateLease(property.id); }} className="edit-lease-form">
                                      <input
                                        type="text"
                                        placeholder="Tenant Name"
                                        value={newLease.tenantName}
                                        onChange={(e) => setNewLease({...newLease, tenantName: e.target.value})}
                                      />
                                      <input
                                        type="date"
                                        placeholder="Start Date"
                                        value={newLease.startDate}
                                        onChange={(e) => setNewLease({...newLease, startDate: e.target.value})}
                                      />
                                      <input
                                        type="date"
                                        placeholder="End Date"
                                        value={newLease.endDate}
                                        onChange={(e) => setNewLease({...newLease, endDate: e.target.value})}
                                      />
                                      <input
                                        type="number"
                                        placeholder="Rent Collection Day"
                                        value={newLease.rentCollectionDay}
                                        onChange={(e) => setNewLease({...newLease, rentCollectionDay: e.target.value})}
                                      />
                                      <div className="form-buttons">
                                        <button type="submit">Update Lease</button>
                                        <button type="button" onClick={cancelEditingLease}>Cancel</button>
                                      </div>
                                    </form>
                                  ) : (
                                    <>
                                      <p>Tenant: {lease.tenantName}</p>
                                      <p>Start Date: {lease.startDate}</p>
                                      <p>End Date: {lease.endDate}</p>
                                      <p>Rent Collection Day: {lease.rentCollectionDay}</p>
                                      <div className="button-group">
                                        <button onClick={() => startEditingLease(property.id, lease)} className="edit-btn">
                                          Edit Lease
                                        </button>
                                        <button onClick={() => deleteLease(property.id, lease.id)} className="delete-btn">
                                          Delete Lease
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                            {!editingLease && (
                              <div className="add-new-lease">
                                <h4>Add New Lease</h4>
                                <form onSubmit={(e) => { e.preventDefault(); addOrUpdateLease(property.id); }} className="add-lease-form">
                                  <input
                                    type="text"
                                    placeholder="Tenant Name"
                                    value={newLease.tenantName}
                                    onChange={(e) => setNewLease({...newLease, tenantName: e.target.value})}
                                  />
                                  <input
                                    type="date"
                                    placeholder="Start Date"
                                    value={newLease.startDate}
                                    onChange={(e) => setNewLease({...newLease, startDate: e.target.value})}
                                  />
                                  <input
                                    type="date"
                                    placeholder="End Date"
                                    value={newLease.endDate}
                                    onChange={(e) => setNewLease({...newLease, endDate: e.target.value})}
                                  />
                                  <input
                                    type="number"
                                    placeholder="Rent Collection Day"
                                    value={newLease.rentCollectionDay}
                                    onChange={(e) => setNewLease({...newLease, rentCollectionDay: e.target.value})}
                                  />
                                  <button type="submit">Add Lease</button>
                                </form>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="total-income">
              <h3>Total Income: ${totalIncome}</h3>
            </div>
          </div>
        </div>

        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Expense</h2>
            <form onSubmit={addExpense}>
              <input
                type="text"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              />
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              />
              <button type="submit">Add Expense</button>
            </form>
          </div>
          <div className="right-column">
            <h2>Expense List</h2>
            <div className="table-container">
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
            </div>
            <div className="total-expenses">
              <h3>Total Expenses: ${totalExpenses}</h3>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button onClick={() => alert('Navigate to Tax Software page')} className="tax-btn">
            Go to Tax Software
          </button>
        </div>
      </div>
      <style jsx>{`
        .real-estate-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        
        }
        h1, h2, h3, h4 {
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }
        .content {
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
            /* Add this line to reduce saturation */
          background-color: rgba(255, 255, 255, 1); /* Adjust the last value (0.5) to control the level of desaturation */
          background-blend-mode: saturation;
        }
        .two-column-layout {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
        }
        .left-column, .right-column {
          flex: 1;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
            /* Add this line to reduce saturation */
          background-color: rgba(255, 255, 255, 0.3); /* Adjust the last value (0.5) to control the level of desaturation */
          background-blend-mode: saturation;
          outline: none;
        }
        input, button {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
          
        }
        label {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        input[type="checkbox"] {
          width: auto;
        }
        button {
          background-color: #2b5887;
          color: white;
          border: none;
          cursor: pointer;
          
        }
        .table-container {
          overflow-x: auto;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 400px;
        }
        th, td {
          text-align: left;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .edit-btn, .delete-btn {
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          width: auto;
        }
        .edit-btn {
          background-color: #ffc107;
          color: black;
          border: none;
        }
        .edit-btn:hover {
          background-color: #e0a800;
        }
        .delete-btn {
          background-color: #dc3545;
          color: white;
          border: none;
        }
        .delete-btn:hover {
          background-color: #c82333;
        }
     
        .total-income, .total-expenses {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
          text-align: right;
            /* Add this line to reduce saturation */
          background-color: rgba(255, 255, 255, 0.3); /* Adjust the last value (0.5) to control the level of desaturation */
          background-blend-mode: saturation;
        }
        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .tax-btn {
          background-color: #3e784b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        .tax-btn:hover {
          background-color: #218838;
        }
        .lease-info {
          background-color: #f8f9fa;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
            /* Add this line to reduce saturation */
          background-color: rgba(255, 255, 255, 0.3); /* Adjust the last value (0.5) to control the level of desaturation */
          background-blend-mode: saturation;
        }
        @media (max-width: 768px) {
          .two-column-layout {
            flex-direction: column;
          }
          .tax-btn {
            width: 100%;
          }
        }
        .lease-header-highlight {
          background-color: #83b57f;
          color: white;
          font-weight: normal;
          padding: 10px;
          border-radius: 5px;
          display: inline-block;
          margin-bottom: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1{
          font-family: 'Montserrat', sans-serif; 
          font-weight: 300;
        }

        h2{
          font-family: 'Montserrat', sans-serif; 
          font-weight: 300; /* Bold weight */
        }
      `}</style>
    </div>
  );
};

export default RealEstatePage;