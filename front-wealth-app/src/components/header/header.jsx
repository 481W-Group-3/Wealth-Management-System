import "./header.css";
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={"header-container"}>
            <div className={"header-background"}/>
            <div className={"page-container"}>
                <div className={"header-divider"}>
                    <Link to={"/home"}>
                        {/* <h1> Wealth Management Systems </h1> */}
                        <img src={logo} alt={"logo"} height={'auto'} width={'200px'}></img>
                    </Link>
                    <div className={"header-links"}>
                        <Link to={"/home"}>
                            <span>Home</span>
                        </Link>
                        <Link to={"/user"}>
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;