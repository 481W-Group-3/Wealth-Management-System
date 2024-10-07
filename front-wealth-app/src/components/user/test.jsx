import React, { useEffect, useState } from 'react';
import { testConnection } from '../../services/connectionService';



const TestComponent = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

    useEffect(() => {
        // Check if the user is logged in by looking for a token or user info in local storage
        const user = localStorage.getItem('user'); 
        setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists

        // If logged in, test the connection
        if (user) {
            testConnection()
                .then((response) => {
                    console.log('Backend Response:', response.data); // Handle the response from the backend
                })
                .catch((error) => {
                    console.error('There was a problem with the request:', error);
                });
        }
    }, []);

    return (
        <div>
            <h1>Testing Backend Connection</h1>
            {isLoggedIn ? (
                <p>You are logged in. Check the console for backend response.</p>
            ) : (
                <p>Please log in to access backend features.</p>
            )}
        </div>
    );
};

export default TestComponent;
