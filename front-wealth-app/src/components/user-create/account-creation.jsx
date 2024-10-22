import React, { useState } from 'react';
import { createAccount } from "../../services/authService";
import FormCards from '../user/FormsForDashboard.jsx';
import welcomeImage from '../user/images/gradient.jpg';

const UserCreate = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [error, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setErrorMessage("Please fill in all the information");
            return;
        }
        if (password !== repassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            await createAccount({
                'username': username,
                'password': password,
                'email': email
            });
            window.location.href = '/dashboard';
        } catch (error) {
            setErrorMessage("Username or Email already exists");
            console.log(error);
        }
    };

    const formFields = [
        {
            name: "username",
            label: "Username",
            type: "text",
            value: username,
            onChange: (e) => setUsername(e.target.value)
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value)
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value)
        },
        {
            name: "repassword",
            label: "Re-enter Password",
            type: "password",
            value: repassword,
            onChange: (e) => setRePassword(e.target.value)
        }
    ];

    return (
        <div className="min-h-screen w-full">
            <div className="w-[450px] mx-auto pt-20">
                <FormCards
                    handleText="Sign up and be one click away from managing your wealth!"
                    welcomeImage={welcomeImage}
                    handleSubmit={handleSubmit}
                    formFields={formFields}
                    showPassword={showPassword}
                    handleShowPassword={() => setShowPassword(!showPassword)}
                    errorMessage={error}
                    submitButtonText={username && email && password && repassword && password === repassword ? "Let's go!" : "Missing Fields or Password Mismatch"}
                />
            </div>
        </div>
    );
};

export default UserCreate;