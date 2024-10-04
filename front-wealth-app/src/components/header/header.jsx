import React from 'react';
import "./header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ isLandingPage = false }) => {
    return (
        <div className="header-container">
            <div className="header-background" />
            <div className="page-container">
                <div className="header-divider">
                    <Link to="/home">
                        <img src={logo} alt="logo" height='auto' width='200px' />
                    </Link>
                    {!isLandingPage && (
                        <div className="header-links">
                            <Link to="/home">
                                <span>Home</span>
                            </Link>
                            <Link to="/user">
                                <span>Login</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;

/* In order to reuse this component, use the code below for pages using a header
<Header />
// or
<Header isLandingPage={false} />
*/