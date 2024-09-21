// LogoutPage.jsx
import React from 'react';
import { doLogout } from '../auth/login-info'; 
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        doLogout(() => {
            navigate('/'); // Redirect to the main landing page after logout
        });
    };

    return (
        <div>
            <h1>You are logged in!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LogoutPage;
