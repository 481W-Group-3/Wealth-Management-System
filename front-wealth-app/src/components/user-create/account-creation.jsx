import "./account-creation.css";
import React, { useState } from 'react';

const UserCreate = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //if (true == true) {
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
            // First Name
            <div>
            <label>First Name:</label>
            </div>
            <input type="text">
                

            </input>

            // Last Name
            <div>
                <label>Last Name:</label>
            </div>
            <input type="text">

            </input>

            // User Name
            <div>
                <label>Username:</label>
            </div>
            <input type="text">

            </input>

            // Email
            <div>
                <label>Email:</label>
            </div>
            <input type="text">

            </input>

            // Password
            <div>
                <label>Password:</label>
            </div>
            <input type="text">

            </input>

            // Repeat Password
            <div>
                <label>Re-enter Password</label>
            </div>
            <input type="text">

            </input>





};



/*
First Name
Last Name
Email
Password
Phone Number
*/
export default UserCreate;