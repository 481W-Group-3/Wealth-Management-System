import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { doLogout } from '../auth/login-info';
import useAuth from '../../utils/useAuth';

const Header = ({ isLandingPage = false }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { isAuthenticated, checkAuth } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const userInfo = JSON.parse(localStorage.getItem('user'));
            setUser(userInfo);
        } else {
            setUser(null);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        doLogout(() => {
            checkAuth(); // Update the authentication state
            navigate('/');
        });
    };

    return (
        <div className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/dashboard">
                    <img src={logo} alt="logo" style={{ width: '200px', height: 'auto' }} />
                </Link>
                {!isLandingPage && isAuthenticated && user && (
                    <div className="flex items-center">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-gray-700 hover:text-gray-900 font-medium"
                            >
                                {user.username}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </Link>
                                    <Link to="/edit-profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Edit Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;