import "./user.css";
import React, { useState } from 'react';

const User = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [rememberMe, setRememberMe] = useState(false);
    // const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // send data to server here
        console.log('Email:', email);
        console.log('Password:', password);
        // console.log('Remember me:', rememberMe);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* email box */}
            <div className="mylabels">
                <label htmlFor="email">Email:</label>
            </div>
            <div className="mytextboxes">
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /></div>

            {/* password box */}
            <div className="mylabels">
                <label htmlFor="password">Password:</label>
            </div>
            <div className="mytextboxes">
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /></div>

            {/* show/hide password checkbox */}
            {/* <div className="mycheckboxes">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                /></div>
            <label htmlFor="showPassword">Show password</label><br /> */}


            {/* login button */}
            <button type="submit">Log In</button><br />

            {/* remember user checkbox */}
            {/* <div className="mycheckboxes">
                <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                /></div>
            <label htmlFor="rememberMe">Remember me</label><br /> */}


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




// const User = () => {
//     return(
//         <div>
//             <p>This is the second page</p>
//         </div>
//     )
// }

// export default User;