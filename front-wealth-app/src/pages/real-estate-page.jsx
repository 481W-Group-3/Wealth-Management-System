import React, { useState } from 'react';

const RealEstatePage = () => {
  const [properties, setProperties] = useState([
    { id: 1, address: '123 Main St', rent: 1500, occupied: true },
    { id: 2, address: '456 Elm St', rent: 1200, occupied: false },
  ]);
  const [newProperty, setNewProperty] = useState({ address: '', rent: '', occupied: false });

  const addProperty = (e) => {
    e.preventDefault();
    setProperties([...properties, { ...newProperty, id: properties.length + 1 }]);
    setNewProperty({ address: '', rent: '', occupied: false });
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <div className="real-estate-container">
      <h1>Real Estate Management</h1>
     
      <div className="content">
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
        <h2>Property List</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Rent</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(property => (
                <tr key={property.id}>
                  <td>{property.address}</td>
                  <td>${property.rent}</td>
                  <td>{property.occupied ? 'Occupied' : 'Vacant'}</td>
                  <td>
                    <button onClick={() => deleteProperty(property.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        .real-estate-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          background: #d6d6d6;
        }
        h1, h2 {
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }
        input, button {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
          width: 70%;
          text-align: center;
        }
        label {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        input[type="checkbox"] {
          max-width: 50%;
        }
        button {
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          max-width: 50%;
        }
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }
        th, td {
          text-align: left;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .delete-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          max-width: 100%;
          width: auto;
        }
        .delete-btn:hover {
          background-color: #c82333;
        }
        @media (max-width: 768px) {
          .content {
            padding: 20px;
          }
          input, button {
            max-width: 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default RealEstatePage;