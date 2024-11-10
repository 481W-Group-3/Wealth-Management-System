import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

import FormsForDashboard from '../components/user/FormsForDashboard';
import { addProperty, listAllProperties, deleteProperty } from '../services/propertyauth';

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
  const [newLease, setNewLease] = useState({ startDate: '', endDate: '', tenantName: '', rentCollectionDay: '' });
  const [viewingLeaseForProperty, setViewingLeaseForProperty] = useState(null);
  const [editingLease, setEditingLease] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
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

  const handleAddOrUpdateLease = (propertyId) => {
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

  const handleDeleteLease = (propertyId, leaseId) => {
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

  const navigate = useNavigate();
  function handleRedirect() {
    navigate('/taxes');
  }

  const totalIncome = properties.reduce((sum, property) => sum + property.incomeMonthly, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-light mb-6 text-center">Real Estate Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[600px]">
          <h2 className="text-2xl font-light mb-4 text-center">Add New Property</h2>
          <div className="flex-grow flex flex-col">
            <div className="w-full flex-grow">
              <FormsForDashboard
                handleSubmit={handleAddProperty}
                formFields={[
                  { name: 'address', label: 'Address', type: 'text', value: newProperty.address, onChange: (e) => setNewProperty({ ...newProperty, address: e.target.value }) },
                  { name: 'incomeMonthly', label: 'Rent', type: 'number', value: newProperty.incomeMonthly, onChange: (e) => setNewProperty({ ...newProperty, incomeMonthly: parseFloat(e.target.value) }) },
                  { name: 'occupied', label: 'Occupied', type: 'checkbox', value: newProperty.occupied, onChange: (e) => setNewProperty({ ...newProperty, occupied: e.target.checked }) }
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
                <EmptyState message="No Properties" />
              ) : (
                <div className="rounded-lg overflow-hidden">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-gray-600 font-medium">Address</th>
                        <th className="px-4 py-2 text-gray-600 font-medium">Rent</th>
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
                            <td className="border-b px-4 py-2">${property.incomeMonthly}</td>
                            <td className="border-b px-4 py-2">{property.occupied ? 'Occupied' : 'Vacant'}</td>
                            <td className="border-b px-4 py-2 text-center">
                              <button onClick={() => toggleLeaseView(property.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-1 px-2 rounded">
                                {viewingLeaseForProperty === property.id ? 'Hide Leases' : 'View Leases'}
                              </button>
                            </td>
                            <td className="border-b px-4 py-2 text-center">
                              <button onClick={() => handleDeleteProperty(property.id)} className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded">
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
                                    <p>Start Date: {lease.startDate}</p>
                                    <p>End Date: {lease.endDate}</p>
                                    <p>Rent Collection Day: {lease.rentCollectionDay}</p>
                                    <div className="text-center mt-2">
                                      <button onClick={() => handleDeleteLease(property.id, lease.id)} className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded">
                                        Delete Lease
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                <FormsForDashboard
                                  handleSubmit={(e) => { e.preventDefault(); handleAddOrUpdateLease(property.id); }}
                                  formFields={[
                                    { name: 'tenantName', label: 'Tenant Name', type: 'text', value: newLease.tenantName, onChange: (e) => setNewLease({ ...newLease, tenantName: e.target.value }) },
                                    { name: 'startDate', label: 'Start Date', type: 'date', value: newLease.startDate, onChange: (e) => setNewLease({ ...newLease, startDate: e.target.value }) },
                                    { name: 'endDate', label: 'End Date', type: 'date', value: newLease.endDate, onChange: (e) => setNewLease({ ...newLease, endDate: e.target.value }) },
                                    { name: 'rentCollectionDay', label: 'Rent Collection Day', type: 'number', value: newLease.rentCollectionDay, onChange: (e) => setNewLease({ ...newLease, rentCollectionDay: e.target.value }) }
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
            <h3 className="text-xl font-light">Total Income: ${totalIncome}</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[600px]">
          <h2 className="text-2xl font-light mb-4 text-center">Add New Expense</h2>
          <div className="flex-grow">
            <FormsForDashboard
              handleSubmit={handleAddExpense}
              formFields={[
                { name: 'description', label: 'Description', type: 'text', value: newExpense.description, onChange: (e) => setNewExpense({ ...newExpense, description: e.target.value }) },
                { name: 'amount', label: 'Amount', type: 'number', value: newExpense.amount, onChange: (e) => setNewExpense({ ...newExpense, amount: e.target.value }) }
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
                <EmptyState message="No Expenses" />
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
                            <button onClick={() => handleDeleteExpense(expense.id)} className="bg-red-500 hover:bg-red-700 text-white font-normal py-1 px-2 rounded">
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
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={() => handleRedirect()} className="bg-green-500 hover:bg-green-700 text-white font-normal py-2 px-4 rounded">
          Go to Tax Software
        </button>
      </div>
    </div>
  );
};

export default RealEstatePage;