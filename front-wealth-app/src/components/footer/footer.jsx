import React from 'react';
import './footer.css'; 

const Footer = () => {
    return (
        <footer className="footer-background">
            <div className={"page-container"}>
                <div className="footer-container">
                    <nav className="footer-content">
                        <h3>Quick Links</h3>
                        <a href="/"><p>Home</p></a>
                        <a href="/about"><p>About</p></a>
                        <a href="/services"><p>Services</p></a>
                        <a href="/contact"><p>Contact</p></a>
                    </nav>
                    <div className="footer-content">
                        <h3>Contact Us</h3>
                        <p>Email: support@money-mentor.com</p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Address: 123 Main St, Anytown, USA 12345</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;