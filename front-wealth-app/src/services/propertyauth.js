// src/services/propertyAuth.js

import apiClient from './apiClient';

// Add a property
export const addProperty = async (propertyData, user) => {
    try {
        const response = await apiClient.post('/api/properties/add', propertyData, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get a property by Id
export const getPropertyById = async (propertyId) => {
    try {
        const response = await apiClient.get(`/api/properties/${propertyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// List all properties
export const listAllProperties = async () => {
    try {
        const response = await apiClient.get('/api/properties/list');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a property
export const updateProperty = async (propertyData) => {
    try {
        const response = await apiClient.put('/api/properties/update', propertyData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a property by Id
export const deleteProperty = async (propertyId) => {
    try {
        await apiClient.delete(`/api/properties/delete/${propertyId}`);
    } catch (error) {
        throw error;
    }
};

// Link a renter to a property
export const linkRenterToProperty = async (propertyId, renterId) => {
    try {
        await apiClient.post(`/api/properties/linkRenter/${propertyId}/${renterId}`);
    } catch (error) {
        throw error;
    }
};

// Create a new lease
export const createLease = async (leaseData) => {
    try {
        console.log('lease', leaseData);
        const response = await apiClient.post('/api/leases/create', leaseData);
        return response.data; // This should include the new lease's ID
    } catch (error) {
        throw error;
    }
};

export const deleteLease = async (leaseId) => {
    try {
        await apiClient.delete(`/api/leases/delete/${leaseId}`);
    } catch (error) {
        throw error;
    }
}

// Link a lease to a property
export const linkLeaseToProperty = async (propertyId, leaseId) => {
    try {
        console.log("propertyId:", typeof propertyId, propertyId);
        console.log("leaseId:", typeof leaseId, leaseId);

        await apiClient.post(`/api/properties/linkLease/${propertyId}/${leaseId}`);
    } catch (error) {
        throw error;
    }
};

// Get renters by property Id
export const getRentersByProperty = async (propertyId) => {
    try {
        const response = await apiClient.get(`/api/properties/${propertyId}/renters`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get maintenance by property Id
export const getMaintenanceByProperty = async (propertyId) => {
    try {
        const response = await apiClient.get(`/api/properties/${propertyId}/maintenance`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Calculate revenue for a property
export const calculateRevenue = async (propertyId) => {
    try {
        const response = await apiClient.get(`/api/properties/${propertyId}/revenue`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const calculatePropertyTax = async (propertyId) => {
    try {
        const response = await apiClient.get(`/api/properties/${propertyId}/propertyTax`);
        return response.data;
    }catch(error) {
        throw error;
    }
}

export const calculateIndividualPropertyTax = async (propertyValue, state, county, city, zip) => {
    try {
        const response = await apiClient.get(`/api/properties/propertyTax/calculate`, {
            params: {
                propertyValue: propertyValue,
                state: state,
                county: county,
                city: city,
                zipCode: zip
            }
        });
        // const response = await apiClient.get('/api/properties/propertyTest');
        return response.data;
    }catch(error) {
        throw error;
    }
}
