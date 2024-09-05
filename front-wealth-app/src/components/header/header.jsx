import "./header.css";
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={"header-container"}>
            <div className={"header-background"}/>
            <div className={"page-container"}>
                <div className={"header-divider"}>
                    <Link to={"/"}>
                        {/* <h1> Wealth Management Systems </h1> */}
                        <div id={"logo"}><img src={logo} alt={"logo"} height={'50%'} width={'50%'}></img></div>
                    </Link>
                    <div className={"header-links"}>
                        <Link to={"/"}>
                            <p>Home</p>
                        </Link>
                        <Link to={"/user"}>
                            <p>Login</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;