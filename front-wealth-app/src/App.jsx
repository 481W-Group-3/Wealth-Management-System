import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Dashboard from "./pages/dashboard.jsx";
import RealEstatePage from './pages/real-estate-page.jsx';
import Login from "./pages/user-page.jsx";
import User from './components/user/login.jsx';
import TestComponent from './components/user/test.jsx';
import LogoutPage from './components/user/logout.jsx';
import AccountCreationPage from "./pages/account-creation-page.jsx";
import InvestmentsLanding from './pages/investments-landing.jsx';
import RetirementPage from './pages/retirement-page.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import UserPage from "./pages/user-page.jsx"; 

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <div className={"app-container"}>
                    <Routes>
                        {/* Unprotected Routes */}
                        <Route path="/" element={<User />} />
                        <Route path="/account-creation" element={<AccountCreationPage />} />
                        <Route path="/user" element={<User />} />

                        {/* Protected Routes */}
                        <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/real-estate" element={<ProtectedRoute><RealEstatePage /></ProtectedRoute>} />
                        <Route path="/investments" element={<ProtectedRoute><InvestmentsLanding /></ProtectedRoute>} />
                        <Route path="/profile-settings" element={<ProtectedRoute><UserPage/></ProtectedRoute>} />
                        <Route path="/test" element={<ProtectedRoute><TestComponent /></ProtectedRoute>} />
                        <Route path="/logout" element={<ProtectedRoute><LogoutPage /></ProtectedRoute>} />
                        <Route path="/retirement" element={<ProtectedRoute><RetirementPage /></ProtectedRoute>} />
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App