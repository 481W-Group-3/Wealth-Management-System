import React from 'react';
import { login } from "../../services/user-service";
import { doLogin } from "../auth/login-info";
import { useNavigate } from 'react-router-dom';
import FormCards from './FormCard';
import Cards from './cards';
import investmentPlanningImage from './images/investment-planning.jpg';
import retirementPlanningImage from './images/retirement-planning.jpg';
import taxOptimizationImage from './images/tax-optimization.jpg';

const User = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

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
            if (response.success) {
                doLogin(response.user, () => {
                    console.log('Logged in successfully!');
                    navigate('/logout');
                });
            } else {
                setErrorMessage(response.message || "Invalid email or password.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again.");
            console.error("Login error:", error.response ? error.response.data : error);
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