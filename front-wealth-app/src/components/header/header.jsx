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
            checkAuth();
            navigate('/');
        });
    };
    
    return (
        <div className="header-container shadow-md" style={{ backgroundColor: '#69a289', height: '75px', minHeight: '75px', maxHeight: '75px' }}>
            <div className="container mx-auto px-4 flex justify-between items-center h-full">
                <Link to="/dashboard" className="focus:outline-none h-full flex items-center">
                    <img src={logo} alt="logo" className="h-10 w-auto" />
                </Link>
                {!isLandingPage && isAuthenticated && user && (
                    <div className="flex items-center h-full">
                        <div className="relative flex items-center">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="username-button font-medium focus:outline-none px-3 py-1 rounded-full text-[#000000] hover:text-white hover:bg-[#964734]/10"
                            >
                                {user.username}
                            </button>
                            {isDropdownOpen && (
                                <div 
                                    ref={dropdownRef} 
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1" 
                                    style={{
                                        zIndex: 9999,
                                        position: 'fixed',
                                        top: '60px',  // Adjust this value based on your header height
                                        right: '20px'
                                    }}
                                >
                                    <Link 
                                        to="/profile-settings" 
                                        className="dropdown-item block px-4 py-2 text-sm text-gray-700"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Edit Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="dropdown-item block w-full text-left px-4 py-2 text-sm text-gray-700 focus:outline-none"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                .header-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9998;
                }
                .header-container a,
                .header-container button {
                    -webkit-tap-highlight-color: transparent;
                    user-select: none;
                }
                .username-button,
                .dropdown-item {
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s, color 0.2s;
                }
                .username-button:focus,
                .dropdown-item:focus {
                    outline: none;
                    box-shadow: none;
                }
                .username-button:hover,
                .username-button:focus {
                    background-color: rgba(150, 71, 52, 0.1);
                    color: white !important;
                    border-radius: 9999px;
                }
                .dropdown-item {
                    position: relative;
                    z-index: 50;
                    display: block;
                    width: 100%;
                    text-align: left;
                }
                .dropdown-item:hover,
                .dropdown-item:focus {
                    background-color: rgba(0, 0, 0, 0.1);
                    color: #2d3748;
                }
                /* Override default focus styles */
                *:focus {
                    outline: none !important;
                    box-shadow: none !important;
                }
                /* Custom focus styles for accessibility */
                .username-button:focus-visible,
                .dropdown-item:focus-visible {
                    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5) !important;
                }
            `}</style>
        </div>
    );
};

export default Header;