import React from 'react';
import { login } from "../../services/user-service";
import { doLogin } from "../auth/login-info";
import { useNavigate } from 'react-router-dom';


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
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left side: Welcome text */}
                <div className="w-full md:w-1/2">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md h-auto">
                        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                        <p className="text-gray-600">
                            Log in to access your account and manage your investments.
                            If you're new here, feel free to explore our features below.
                            
                        </p>
                    </div>
                </div>

                {/* Right side: Login form */}
                <div className="w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{errorMessage}</div>}
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center" htmlFor="showPassword">
                                <input
                                    className="mr-2 leading-tight"
                                    type="checkbox"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={handleShowPassword}
                                />
                                <span className="text-sm">Show password</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Log In
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>

                        <div className="mt-4">
                            <label className="flex items-center" htmlFor="rememberMe">
                                <input
                                    className="mr-2 leading-tight"
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm">Remember me</span>
                            </label>
                        </div>

                        <div className="mt-6 text-center">
                            <a className="font-bold text-sm text-blue-500 hover:text-blue-800" href="/account-creation">
                                Create an account
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            {/* Cards section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="/api/placeholder/400/200" alt="Investment Planning" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">Investment Planning</h3>
                            <p className="text-gray-700">Personalized investment strategies tailored to your financial goals.</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="/api/placeholder/400/200" alt="Retirement Planning" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">Retirement Planning</h3>
                            <p className="text-gray-700">Secure your future with our comprehensive retirement planning services.</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="/api/placeholder/400/200" alt="Tax Optimization" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">Tax Optimization</h3>
                            <p className="text-gray-700">Maximize your returns with our expert tax optimization strategies.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;