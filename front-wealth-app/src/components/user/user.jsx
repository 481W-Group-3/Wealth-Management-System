import "./user.css";
import React, { useState } from 'react';
import { login } from "../../services/user-service";
import { doLogin } from "../auth/login-info";
import { useNavigate } from 'react-router-dom';

const User = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // // Redirect to dashboard if already logged in
    // useEffect(() => {
    //     if (isLoggedin()) {
    //         window.location.href = "/dashboard";
    //     }
    // }, []);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }
        console.log("Email entered:", email);
    console.log("Password entered:", password);

        try {
            // Call the login service to validate the user's credentials
            const response = await login({ email, password });
            console.log(response);
            console.log(email);
            console.log("you entered: ");
            console.log("outside the if-else block")

            if (response.success) {
                console.log("inside the if block")
                // Save user data in localStorage using doLogin
                doLogin(response.user, () => {
                    console.log('Logged in successfully!');
                    //window.location.href = "/home"; // Redirect to dashboard
                    navigate('/logout');
                });
            } else {
                console.log("inside the else block")
                // Show error message from API response or generic message
                setErrorMessage(response.message || "Invalid email or password.");
            }
        } catch (error) {
            console.log("inside the catch error block")
            // Handle any errors that occur during the login process
            setErrorMessage("An error occurred. Please try again.");
            console.error("Login error:", error.response ? error.response.data : error);

        }
        console.log("outside everything")
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
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

            <label className="checkbox-container" htmlFor="showPassword">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={handleShowPassword}
                />
                Show password
            </label><br />

            <button type="submit">Log In</button><br />

            <label className="checkbox-container" htmlFor="rememberMe">
                <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
            </label><br />

            <a href="#">
                <div className="mylabels">Forgot password?</div>
            </a>
            <a href="/account-creation">
                <div className="mylabels">Create an account</div>
            </a>
        </form>
    );
};

export default User;