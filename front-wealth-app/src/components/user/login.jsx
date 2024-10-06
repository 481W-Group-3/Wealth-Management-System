import React, { useState } from 'react';
import { login } from "../../services/user-service";
import FormCards from './FormCard';
import Cards from './cards';
import investmentPlanningImage from './images/investment-planning.jpg';
import retirementPlanningImage from './images/retirement-planning.jpg';
import taxOptimizationImage from './images/tax-optimization.jpg';
import useAuth from '../../utils/useAuth';

const User = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { checkAuth } = useAuth();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }
        try {
            const response = await login({ email, password });
            console.log("This is before response.success");
            if (response.success) {
                console.log('Logged in successfully!');
                localStorage.setItem('user', JSON.stringify(response.user));
                checkAuth();
                // Refresh the page
                window.location.href = '/dashboard';
            } else {
                setErrorMessage(response.message || "Invalid email or password.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            console.error("Login error:", error);
        }
    };

    const formCardsProps = {
        welcomeTitle: "Welcome Back!",
        welcomeText: "Log in to access your account and manage your investments. If you're new here, feel free to explore our features below.",
        handleSubmit: handleSubmit,
        formFields: [
            { name: 'email', type: 'text', label: 'Email', value: email, onChange: (e) => setEmail(e.target.value) },
            { name: 'password', type: 'password', label: 'Password', value: password, onChange: (e) => setPassword(e.target.value) }
        ],
        showPassword: showPassword,
        handleShowPassword: handleShowPassword,
        rememberMe: rememberMe,
        setRememberMe: setRememberMe,
        errorMessage: errorMessage,
        submitButtonText: "Log In",
        forgotPasswordLink: { href: "#", text: "Forgot Password?" },
        createAccountLink: { href: "/account-creation", text: "Create an account" }
    };

    const cardsProps = {
        title: "Our Services",
        cards: [
            {
                imageSrc: investmentPlanningImage,
                title: "Investment Planning",
                description: "Personalized investment strategies tailored to your financial goals."
            },
            {
                imageSrc: taxOptimizationImage,
                title: "Retirement Planning",
                description: "Secure your future with our comprehensive retirement planning services."
            },
            {
                imageSrc: retirementPlanningImage,
                title: "Tax Optimization",
                description: "Maximize your returns with our expert tax optimization strategies."
            }
        ]
    };

    return (
        <div className="container mx-auto p-4">
            <FormCards {...formCardsProps} />
            <Cards {...cardsProps} />
        </div>
    );
};

export default User;