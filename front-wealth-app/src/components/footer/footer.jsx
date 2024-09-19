import React from 'react';
import './Footer.css'; // We'll create this CSS file next

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <nav className="footer-nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <p>Email: info@example.com</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Address: 123 Main St, Anytown, USA 12345</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;