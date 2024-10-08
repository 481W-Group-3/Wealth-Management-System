import React, {useEffect} from "react";
import {useState} from "react";
import "./profile-settings.css";
import {getUserProfile, getUserProfiles, updateUserProfile} from "../../services/user-service.js";
import Profile from "./profile/profile0.jpg";
import FormCards from '../user/FormsForDashboard.jsx';
import welcomeImage from "../user/images/gradient.jpg";


const ProfileSettings = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState(false);
    const [userList, setUserList] = useState([]);

    const [profilePhoto, setProfilePhoto] = useState(1);
    // const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    
    console.log(error);

    const loadProfile = async () => {
        try {
            const response = await getUserProfile();
            setUsername(response.username);
            setEmail(response.email);
            setRole(response.role);
            // setNewUsername(response.username);
            setNewEmail(response.email);
        } catch (err) {
            setError("Could not load user");
            console.log(err);
        }
    }
    
    const loadUserList = async () => {
        try{
            const list = await getUserProfiles();
            setUserList(list);
        }catch (error) {
            setError("Could not load user List");
            console.log(error);
        }
    }

    useEffect(() => {
        loadProfile();
        // loadUserList();
    }, []);

    const setPhoto = () => {
        const num = (profilePhoto + 1) % 3;
        setProfilePhoto(num);
    }
    const formFields = [
        // {
        //     name: "username",
        //     label: "Username",
        //     type: "text",
        //     value: newUsername,
        //     onChange: (e) => setNewUsername(e.target.value)
        // },
        {
            name: "email",
            label: "Email",
            type: "email",
            value: newEmail,
            onChange: (e) => setNewEmail(e.target.value)
        }
    ];

    const toggleProfileEdit = () => {
        document.getElementById("edit-profile").classList.toggle("display");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        // if (newUsername !== "") data.username = newUsername;
        if (newEmail !== "") data.email = newEmail;
        console.log(data);
        try {
            const response = await updateUserProfile(data);
            // setUsername(response.username);
            setEmail(response.email);
            setNewEmail(response.email);
            // setUsername(response.username);
        } catch (error) {
            console.log(error);
            setError("Problem has occured updating the account");
        }
        toggleProfileEdit();
        loadProfile();
    }

    return (
        <div className={"page-container"}>
            <div className={"account-container"}>
                <div className={"profile-title"}>
                    <h1> Profile Settings</h1>
                </div>
                <div className={"profile-container"}>
                    <div className={"profile-text"}>
                        <img className={"profile-photo"} src={Profile} alt="profile photo"/>
                        <button onClick={setPhoto}>Change Photo</button>
                    </div>
                    <div className={"profile-text"}>
                        <div className={"profile-component"}>
                            <h2>Profile Username: </h2>
                            <p>{username}</p>
                        </div>
                        <div className={"profile-component"}>
                            <h2>Profile Email: </h2>
                            <p>{email}</p>
                        </div>
                        <div className={"profile-component"}>
                            <h2>Permission Level: </h2>
                            <p>{role}</p>
                        </div>
                    </div>
                </div>
                <button onClick={toggleProfileEdit}>Edit User Profile</button>
            </div>
            <div id={"edit-profile"} className={"edit-profile-form display"}>
                <div>
                    <h2>Edit Profile Form</h2>
                    <FormCards handleText="Edit Account Settings"
                               welcomeImage={welcomeImage}
                               handleSubmit={handleSubmit}
                               formFields={formFields}
                               submitButtonText={username || email ? "Change" : "Change one field"}/>
                    <button onClick={toggleProfileEdit}> Exit</button>
                </div>
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