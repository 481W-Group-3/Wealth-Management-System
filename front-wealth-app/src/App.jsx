import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import MainLandingPage from "./pages/main-landing-page.jsx";
import RealEstatePage from './pages/real-estate-page.jsx';
import UserPage from "./pages/user-page.jsx";
import User from './components/user/user.jsx';
import TestComponent from './components/user/test.jsx';
import LogoutPage from './components/user/logout.jsx';
import AccountCreationPage from "./pages/account-creation-page.jsx";
import InvestmentsLanding from './pages/investments-landing.jsx';

function App() {
    return (
        <div>
            <BrowserRouter>
            <Header/>
                <div className={"app-container"}>
                    <Routes>
                        <Route Component={UserPage} path={"/"}/>
                        <Route Component={MainLandingPage} path={"/home"}/>
                        <Route Component={RealEstatePage} path="/real-estate"/>
                        <Route Component={AccountCreationPage} path="/account-creation"/>
                        <Route Component={InvestmentsLanding} path="investments"/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/test" element={<TestComponent/>}/>
                        <Route path="/logout" element={<LogoutPage/>}/>
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App