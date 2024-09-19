import "./account-creation.css";
import React, { useState } from 'react';

const UserCreate = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        //if (/*email in use*/) {
        //TODO Check if Email is in use when Database is implemented
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('User Name:', userName);
        console.log('Email:', email);
        console.log('Password:', password);
        //}
        //else {
        //display Error Text somewhere.
        //}
    };
    return (
        <form onSubmit={handleSubmit}>
            {/* First Name*/}
            <div>
                <label htmlFor="firstname">First Name:</label>
            </div>
            <input 
            type="text"
            id="firstname"
            name="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}>
            </input><br />


            {/* Last Name*/}
            <div>
                <label htmlFor="lastname">Last Name:</label>
            </div>
            <input 
            type="text"
            id="lastname"
            name="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}>
            </input><br />

            {/* User Name*/}
            <div>
                <label htmlFor="username">Username:</label>
            </div>
            <input 
            type="text"
            /*id="username"
            name="username"
            value={userName}*/
            onChange={(e) => setUserName(e.target.value)}>
            </input><br />

            {/*Email*/}
            <div>
                <label htmlFor="email">Email:</label>
            </div>
            <input 
            type="text"
            /*id="email"
            name="email"
            value={email}*/
            onChange={(e) => setEmail(e.target.value)}>
            </input><br />

            {/* Password*/}
            <div>
                <label htmlFor="password">Password:</label>
            </div>
            <input 
            type="password"
            /*id="password"
            name="password"
            value={password}*/
            onChange={(e) => setPassword(e.target.value)}>
            </input><br />

            {/* Repeat Password */}
            <div>
                <label htmlFor="repeatpassword">Re-enter Password</label>
            </div>
            <input 
                type="password"
                /*id="repeatpassword"
                name="repeatpassword"
                value={repeatPassword}*/
                onChange={(e) => setRepeatPassword(e.target.value)}>
            </input><br />

            <button type="submit">Submit</button><br />

            <style jsx>{`
                form{
                    height: 550px;
                }
            `}</style>
        </form>
        
    );




};

export default UserCreate;