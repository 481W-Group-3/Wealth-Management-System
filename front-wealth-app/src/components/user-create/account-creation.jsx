import "./account-creation.css";
import React, {useState} from 'react';
import {createAccount} from "../../services/user-service";

const UserCreate = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const role = "USER"
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        //if (/*email in use*/) {
        //TODO Check if Email is in use when Database is implemented
        await createAccount({
            'username': username, 
            'password': password, 
            'role': role,
            'email': email
        });
        console.log('User Name:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        //}
        //else {
        //display Error Text somewhere.
        //}
    };
    return (
        <div className="page-container">
            <div className={"create-account-container"}>
                <form onSubmit={handleSubmit}>
                    <div className={"in-form-container"}>
                        <h2>Create Account</h2>
                        <div className={"form-component"}>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}>
                            </input>
                        </div>

                        <div className={"form-component"}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </div>

                        <div className={"form-component"}>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </div>

                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );


};

export default UserCreate;