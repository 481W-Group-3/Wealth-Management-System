import React from 'react';
import './footer.css'; 

const Footer = () => {
    return (
        <footer className="footer-background">
            <div className={"page-container"}>
                <div className="footer-container">
                    <nav className="footer-content">
                        <a href="/"><p>Home</p></a>
                        <a href="/dashboard"><p>Dashboard</p></a>
                    </nav>
                    <div className="footer-content">
                        <h3>Contact Us</h3>
                        <hr />
                        <p>Email: support@money-mentor.com</p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Eastern Michigan University, Ypsilanti, MI 48197</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;