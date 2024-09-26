import React, { useState } from 'react';
import './styling/real-estate.css';
import Form from '../components/form/form.jsx'
import List from '../components/list/list.jsx'
import './styling/real-estate.css'

const RealEstatePage = () => {
  //Should come from database in the future
  const [properties, setProperties] = useState([
    { 
      id: 1, 
      address: '123 Main St', 
      rent: 1500, 
      occupied: true,
      leases: [
        { id: 1, startDate: '2023-01-01', endDate: '2023-12-31', tenantName: 'John Doe', rentCollectionDay: 1, isActive: true }
      ]
    },
    { 
      id: 2, 
      address: '456 Elm St', 
      rent: 1200, 
      occupied: false,
      leases: []
    },
  ]);

  const [newProperty, setNewProperty] = useState({ address: '', rent: '', occupied: false });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

  const addProperty = (e) => {
    e.preventDefault();
    setProperties([...properties, { ...newProperty, id: properties.length + 1, rent: Number(newProperty.rent), leases: [] }]);
    setNewProperty({ address: '', rent: '', occupied: false });
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

  const propertyFields = [
    { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter address' },
    { label: 'Rent', name: 'rent', type: 'number', placeholder: 'Enter rent' },
    { label: 'Occupied', name: 'occupied', type: 'checkbox', placeholder: 'Occupied' },
  ];

  const expenseFields = [
    { label: 'Description', name: 'description', type: 'text', placeholder: 'Enter description' },
    { label: 'Amount', name: 'amount', type: 'number', placeholder: 'Enter amount' },
  ];

  const renderPropertyItem = (property) => (
    <>
      <td>{property.address}</td>
      <td>${property.rent}</td>
      <td>{property.occupied ? 'Occupied' : 'Vacant'}</td>
    </>
  );

  const renderExpenseItem = (expense) => (
    <>
      <td>{expense.description}</td>
      <td>${expense.amount}</td>
    </>
  );

  return (
    <div className="real-estate-container">
      <h1>Real Estate Management</h1>

      <div className="content">
        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Property</h2>
            <Form
              fields={propertyFields} 
              values={newProperty} 
              onChange={setNewProperty} 
              onSubmit={addProperty} 
            />
          </div>
          <div className="right-column">
            <h2>Property List</h2>
            <List 
              items={properties} 
              renderItem={renderPropertyItem} 
              onDelete={deleteProperty} 
            />
          </div>
        </div>

        <div className="two-column-layout">
          <div className="left-column">
            <h2>Add New Expense</h2>
            <Form 
              fields={expenseFields} 
              values={newExpense} 
              onChange={setNewExpense} 
              onSubmit={addExpense} 
            />
          </div>
          <div className="right-column">
            <h2>Expense List</h2>
            <List 
              items={expenses} 
              renderItem={renderExpenseItem} 
              onDelete={deleteExpense} 
            />
          </div>
        </div>

        <div className="button-container">
          <button onClick={() => alert('Navigate to Tax Software page')} className="tax-btn">
            Go to Tax Software
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealEstatePage;
