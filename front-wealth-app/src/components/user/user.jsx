import "./user.css";
import React, { useState } from 'react';

const User = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const user = "USER";

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            "username": email, 
            "password": password,
            "role": user};
        
        fetch('http://localhost:8080/register/user', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        }).then(() => {
            console.log("posted data")
        })
        
        // send data to server here
        console.log('Email:', email);
        console.log('Password:', password);
        console.log(userData);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* email box */}
            <div className="mylabels">
                <label htmlFor="email">Email:</label>
            </div>
            <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* password box */}
            <div className="mylabels">
                <label htmlFor="password">Password:</label>
            </div>
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />

            {/* show/hide password checkbox */}
            <label className="checkbox-container" htmlFor="showPassword">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={handleShowPassword}
                />
                Show password
                <span className="checkmark"></span>
            </label><br />


            {/* login button */}
            <button type="submit">Log In</button><br />

            {/* remember user checkbox */}
            <label className="checkbox-container" htmlFor="rememberMe">
                <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
                <span className="checkmark"></span>
            </label><br />


            {/* forgot password and create account links */}
            <a href="#">
                <div className="mylabels">Forgot password?</div>
            </a>
            <a href="#">
                <div className="mylabels">Create an account</div>
            </a>
        </form>
    );
};

export default User;
