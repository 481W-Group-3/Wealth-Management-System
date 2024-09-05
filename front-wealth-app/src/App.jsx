import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import HomePage from "./pages/home-page.jsx";
import UserPage from "./pages/user-page.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route Component={HomePage} path={"/"}/>
                    <Route Component={UserPage} path={"/user"}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    )
}

export default App
