import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FormsForDashboard from '../components/user/FormsForDashboard';
import {
  addProperty,
  listAllProperties,
  deleteProperty,
  linkLeaseToProperty,
  createLease,
  deleteLease,
  calculatePropertyTax
} from '../services/propertyauth';

import APINinja from "../assets/apininjas_logo.png";

const EmptyState = ({ message }) => (
  <div className="flex items-center justify-center h-full">
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);

const RealEstatePage = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ address: '', incomeMonthly: '', occupied: false });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });
  const [newLease, setNewLease] = useState({ startDate: '', endDate: '', tenantName: '', paymentMonthly: '', rentDueDay: '' });
  const [viewingLeaseForProperty, setViewingLeaseForProperty] = useState(null);
  const [editingLease, setEditingLease] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const allProperties = await listAllProperties();
        const propertiesWithIncome = (allProperties || []).map(property => {
          const monthlyIncome = property.leases
            ? property.leases.reduce((sum, lease) => sum + (lease.paymentMonthly || 0), 0)
            : 0;
          return { ...property, monthlyIncome };
        });
        setProperties(propertiesWithIncome || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setErrorMessage('Failed to fetch properties. Please try again.'); useEffect(() => {
          const fetchProperties = async () => {
            try {
              const allProperties = await listAllProperties();
              setProperties(allProperties || []);
            } catch (error) {
              console.error('Error fetching properties:', error);
              setErrorMessage('Failed to fetch properties. Please try again.');
            }
          };

          fetchProperties();
        }, []);
      }
    };

    fetchProperties();
  }, []);

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const addedProperty = await addProperty({ ...newProperty });
      setProperties([...properties, { ...addedProperty, leases: [] }]);
      setNewProperty({ address: '', incomeMonthly: '', occupied: false });
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding property:', error);
      setErrorMessage('Failed to add property. Please try again.');
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      const property = properties.find((p) => p.id === id);
      if (property && property.leases) {
        for (const lease of property.leases) {
          await deleteLease(lease.id);
        }
      }
      await deleteProperty(id);
      setProperties(properties.filter(property => property.id !== id));
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting property:', error);
      setErrorMessage('Failed to delete property. Please try again.');
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1, amount: Number(newExpense.amount) }]);
    setNewExpense({ description: '', amount: '' });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const toggleLeaseView = (propertyId) => {
    setViewingLeaseForProperty(prevId => prevId === propertyId ? null : propertyId);
    setEditingLease(null);
  };

  const handleAddOrUpdateLease = async (propertyId) => {
    try {
      const leaseData = {
        tenantName: newLease.tenantName,
        startDate: new Date(newLease.startDate).toISOString(),
        endDate: new Date(newLease.endDate).toISOString(),
        paymentMonthly: newLease.paymentMonthly,
        rentDueDay: newLease.rentDueDay,
        property: { id: propertyId }
      };

      const createdLease = await createLease(leaseData);

      await linkLeaseToProperty(propertyId, createdLease.id);

      setProperties(properties.map(property => {
        if (property.id === propertyId) {
          const updatedLeases = [...property.leases, createdLease];
          return {
            ...property,
            leases: updatedLeases,
            monthlyIncome: calculateMonthlyIncome(updatedLeases),
          };
        }
        return property;
      }));

      // Reset the lease form fields
      setNewLease({ startDate: '', endDate: '', tenantName: '', rentDueDay: '', paymentMonthly: '' });
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding lease:', error);
      setErrorMessage('Failed to add lease. Please try again.');
    }
  };


  const handleDeleteLease = async (propertyId, leaseId) => {
    try {
      // Call the backend to delete the lease
      await deleteLease(leaseId);

      // Update local state to remove the lease from the specified property
      const updatedProperties = properties.map((property) => {
        if (property.id === propertyId) {
          const updatedLeases = property.leases.filter((lease) => lease.id !== leaseId);
          return {
            ...property,
            leases: updatedLeases,
            occupied: updatedLeases.some((lease) => lease.isActive),
            monthlyIncome: calculateMonthlyIncome(updatedLeases),
          };
        }
        return property;
      });

      setProperties(updatedProperties);
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting lease:', error);
      setErrorMessage('Failed to delete lease. Please try again.');
    }
  };

  const navigate = useNavigate();
  function handleRedirect() {
    navigate('/taxes');
  }

  const calculateMonthlyIncome = (propertyId) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property || !property.leases) return 0;

    return property.leases.reduce((sum, lease) => sum + (lease.paymentMonthly || 0), 0);
  };

  const calculateTotalMonthlyIncome = () => {
    let income = 0;
    properties.forEach(function (property) {
      income += calculateMonthlyIncome(property.id);
    });
    return income;
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
      <div className="container mx-auto px-4 py-8 bg-white rounded-lg" style={{maxWidth: "1200px"}}>
        <h1 className="text-3xl font-light mb-6 text-center">Real Estate Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[600px]">
            <h2 className="text-2xl font-light mb-4 text-center">Add New Property</h2>
            <div className="flex-grow flex flex-col">
              <div className="w-full flex-grow">
                <FormsForDashboard
                    handleSubmit={handleAddProperty}
                    formFields={[
                      {
                        name: 'address',
                        label: 'Address',
                        type: 'text',
                        value: newProperty.address,
                        onChange: (e) => setNewProperty({...newProperty, address: e.target.value})
                      },
                      {
                        name: 'occupied',
                        label: 'Occupied',
                        type: 'checkbox',
                        value: newProperty.occupied,
                        onChange: (e) => setNewProperty({...newProperty, occupied: e.target.checked})
                      }
                    ]}
                    errorMessage={errorMessage}
                    submitButtonText="Add Property"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[600px]">
            <h2 className="text-2xl font-light mb-4 text-center">Property List</h2>
            <div className="flex-grow overflow-hidden">
              <div className="h-full overflow-y-auto">
                {properties.length === 0 ? (
                    <EmptyState message="No Properties"/>
                ) : (
                    <div className="rounded-lg overflow-hidden">
                      <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-gray-600 font-medium">Address</th>
                          <th className="px-4 py-2 text-gray-600 font-medium">Monthly Income</th>
                          <th className="px-4 py-2 text-gray-600 font-medium">Status</th>
                          <th className="px-4 py-2 text-gray-600 font-medium">Lease Info</th>
                          <th className="px-4 py-2 text-gray-600 font-medium">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {properties.map(property => (
                            <React.Fragment key={property.id}>
                              <tr className="hover:bg-gray-50">
                                <td className="border-b px-4 py-2">{property.address}</td>
                                <td className="border-b px-4 py-2">${calculateMonthlyIncome(property.id)}</td>
                                <td className="border-b px-4 py-2">{property.occupied ? 'Occupied' : 'Vacant'}</td>
                                <td className="border-b px-4 py-2 text-center">
                                  <button onClick={() => toggleLeaseView(property.id)}
                                          className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-1 px-2 rounded">
                                    {viewingLeaseForProperty === property.id ? 'Hide Leases' : 'View Leases'}
                                  </button>
                                </td>
                                <td className="border-b px-4 py-2 text-center">
                                  <button onClick={() => handleDeleteProperty(property.id)}
                                          className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded">
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              {viewingLeaseForProperty === property.id && (
                                  <tr>
                                    <td colSpan="5" className="border-b px-4 py-2">
                                      <h3 className="text-xl font-light mb-2">Leases for {property.address}</h3>
                                      {property.leases && property.leases.map(lease => (
                                          <div key={lease.id} className="mb-4 p-4 bg-gray-100 rounded">
                                            <p>Tenant: {lease.tenantName}</p>
                                            <p>Start Date: {lease.startDate.substring(0, 10)}</p>
                                            <p>End Date: {lease.endDate.substring(0, 10)}</p>
                                            <p>Monthly Income: ${lease.paymentMonthly}</p>
                                            <p>Rent Collection Day: {lease.rentDueDay}</p>
                                            <div className="text-center mt-2">
                                              <button onClick={() => handleDeleteLease(property.id, lease.id)}
                                                      className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded">
                                                Delete Lease
                                              </button>
                                            </div>
                                          </div>
                                      ))}
                                      <FormsForDashboard
                                          handleSubmit={(e) => {
                                            e.preventDefault();
                                            handleAddOrUpdateLease(property.id);
                                          }}
                                          formFields={[
                                            {
                                              name: 'tenantName',
                                              label: 'Tenant Name',
                                              type: 'text',
                                              value: newLease.tenantName,
                                              onChange: (e) => setNewLease({...newLease, tenantName: e.target.value})
                                            },
                                            {
                                              name: 'startDate',
                                              label: 'Start Date',
                                              type: 'date',
                                              value: newLease.startDate,
                                              onChange: (e) => setNewLease({...newLease, startDate: e.target.value})
                                            },
                                            {
                                              name: 'endDate',
                                              label: 'End Date',
                                              type: 'date',
                                              value: newLease.endDate,
                                              onChange: (e) => setNewLease({...newLease, endDate: e.target.value})
                                            },
                                            {
                                              name: 'paymentMonthly',
                                              label: 'Rent Monthly',
                                              type: 'number',
                                              value: newLease.paymentMonthly,
                                              onChange: (e) => setNewLease({
                                                ...newLease,
                                                paymentMonthly: e.target.value
                                              })
                                            },
                                            {
                                              name: 'rentDueDay',
                                              label: 'Rent Collection Day',
                                              type: 'number',
                                              value: newLease.rentDueDay,
                                              onChange: (e) => setNewLease({...newLease, rentDueDay: e.target.value})
                                            }
                                          ]}
                                          submitButtonText={editingLease ? 'Update Lease' : 'Add Lease'}
                                      />
                                    </td>
                                  </tr>
                              )}
                            </React.Fragment>
                        ))}

                        </tbody>
                      </table>
                    </div>
                )}
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="text-xl font-light">Total Income: ${calculateTotalMonthlyIncome()}</h3>
            </div>
          </div>

         {/* <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[600px]">
            <h2 className="text-2xl font-light mb-4 text-center">Add New Expense</h2>
            <div className="flex-grow">
              <FormsForDashboard
                  handleSubmit={handleAddExpense}
                  formFields={[
                    {
                      name: 'description',
                      label: 'Description',
                      type: 'text',
                      value: newExpense.description,
                      onChange: (e) => setNewExpense({...newExpense, description: e.target.value})
                    },
                    {
                      name: 'amount',
                      label: 'Amount',
                      type: 'number',
                      value: newExpense.amount,
                      onChange: (e) => setNewExpense({...newExpense, amount: e.target.value})
                    }
                  ]}
                  submitButtonText="Add Expense"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[600px]">
            <h2 className="text-2xl font-light mb-4 text-center">Expense List</h2>
            <div className="flex-grow overflow-hidden">
              <div className="h-full overflow-y-auto">
                {expenses.length === 0 ? (
                    <EmptyState message="No Expenses"/>
                ) : (
                    <div className="rounded-lg overflow-hidden">
                      <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-gray-600 font-medium">Description</th>
                          <th className="px-4 py-2 text-gray-600 font-medium">Amount</th>
                          <th className="px-4 py-2 text-gray-600 font-medium">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {expenses.map(expense => (
                            <tr key={expense.id} className="hover:bg-gray-50">
                              <td className="border-b px-4 py-2">{expense.description}</td>
                              <td className="border-b px-4 py-2">${expense.amount}</td>
                              <td className="border-b px-4 py-2 text-center">
                                <button onClick={() => handleDeleteExpense(expense.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded">
                                  Remove
                                </button>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                )}
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="text-xl font-light">Total Expenses: ${totalExpenses}</h3>
            </div>
          </div> */}
        </div>


        <div className="flex justify-center mt-8">
          <img src={APINinja} alt={"apiNinja"} style={{height: "30px", margin: "auto 0"}}/>
          <p style={{margin: "auto 10px"}}>Implementing Api Ninja to find regional property tax rates</p>
          {/*<button onClick={() => handleRedirect()} className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded">*/}
          {/*  Go to Tax Software*/}
          {/*</button>*/}
        </div>
      </div>
  );
};

export default RealEstatePage;