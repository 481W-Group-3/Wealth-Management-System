import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import MainLandingPage from "./pages/main-landing-page.jsx";
import RealEstatePage from './pages/real-estate-page.jsx'; // Updated import
import UserPage from "./pages/user-page.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route Component={MainLandingPage} path={"/"}/>
                    <Route Component={RealEstatePage} path="/real-estate"/>
                    
                    <Route Component={UserPage} path={"/user"}/>
                     
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App
