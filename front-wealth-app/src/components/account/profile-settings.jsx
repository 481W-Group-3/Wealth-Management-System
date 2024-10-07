import React from "react";
import {useState} from "react";
import "./profile-settings.css";
import {getUserProfile} from "../../services/user-service.js";
import Profile from "./profile/profile2.jpg";


const ProfileSettings = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState(false);
    const [userList, setUserList] = useState([]);

    const [profilePhoto, setProfilePhoto] = useState(1);

    const loadProfile = async () => {
        try {
            const response = getUserProfile();
            console.log(response.username, response.email, response.password);
            setUsername(response.username);
            setEmail(response.email);
            setRole(response.role);
        } catch (err) {
            setError("Could not load user");
            console.log(err);
        }
    }

    const setPhoto = () => {
        const num = (profilePhoto + 1) % 3;
        setProfilePhoto(num);
    }

    const editProfileData = () => {
        document.getElementById("edit-profile").classList.toggle("display");
    }

    const handleSubmit = (e) => {

    }

    return (
        <div className={"page-container"}>
            <div className={"account-container"}>
                <div className={"profile-title"}>
                    <h1> Profile Settings</h1>
                </div>
                <div className={"profile-container"}>
                    {error && <h3> error </h3>}
                    <div className={"profile-text"}>
                        <img className={"profile-photo"} src={Profile} alt="profile photo"/>
                        <button onClick={setPhoto}>Change Photo</button>
                    </div>
                    <div className={"profile-text"}>
                        <div className={"profile-component"}>
                            <h2>Profile Username: </h2>
                            <p>Username</p>
                        </div>
                        <div className={"profile-component"}>
                            <h2>Profile Email: </h2>
                            <p>Email@gmail.com</p>
                        </div>
                        <div className={"profile-component"}>
                            <h2>Permission Level: </h2>
                            <p>USER</p>
                        </div>
                    </div>
                </div>
                <button onClick={editProfileData}>Edit User Profile</button>
            </div>
            <div id={"edit-profile"} className={"edit-profile-form display"}>
                <h2>Edit Profile Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>New Username</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>New Email</label>
                        <input type="email"/>
                    </div>
                    <div>
                        <button type={"submit"}>Submit Changes</button>
                    </div>
                </form>
            </div>
            <div className={"admin-features"}>
                <h1>Admin Features</h1>
                {userList &&
                    <div>
                        <p>Display list here (Only displays if user is admin)</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfileSettings;