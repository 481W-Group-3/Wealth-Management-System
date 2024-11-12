import React, {useCallback, useEffect} from "react";
import {useState} from "react";
import "./profile-settings.css";
import {
    deleteUserProfile,
    getUserProfile,
    getUserProfiles,
    setUserAdmin, setUserImage,
    updateUserProfile
} from "../../services/user-service.js";
import Profile from "../../assets/profile-pics/profile0.jpg";
import FormCards from '../user/FormsForDashboard.jsx';
import welcomeImage from "../user/images/gradient.jpg";
import UploadSVG from "../../assets/upload.svg?react";
import {useDropzone} from "react-dropzone";


const ProfileSettings = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState(false);
    const [userList, setUserList] = useState([]);
    // const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [imageSrc, setImageSrc] = useState(null);

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

    // const onDrop = useCallback((acceptedFiles) => {
    //    
    // },[])

    const loadUserList = async () => {
        try {
            const list = await getUserProfiles();
            setUserList(list);
            console.log(list);
        } catch (error) {
            setError("Could not load user List");
            console.log(error);
        }
    }

    const giveUserAdmin = async (id) => {
        try {
            const response = await setUserAdmin(id)
                .then(() => loadUserList());
            console.log(response);
        } catch (error) {
            setError("Error setting admin");
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await deleteUserProfile(id)
                .then(() => loadUserList());
            console.log(response);
        } catch (error) {
            setError("Error deleting user");
            console.log(error);
        }
    }

    useEffect(() => {
        loadProfile();
        loadUserList();
        setImageSrc("");
    }, []);

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

    const toggleImageUpload = () => {
        document.getElementById("image-upload").classList.toggle("display");
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
    
    // const byteToBase64 = (buffer) => {
    //     let binary ='';
    //     let bytes = new Uint8Array(buffer);
    //     for(let i = 0; i < bytes.byteLength; i++) {
    //         binary += String.fromCharCode(bytes[i]);
    //     }
    //     return window.btoa(binary);
    // }
    
    // const onDrop = useCallback((acceptedFiles) => {
    //     acceptedFiles.forEach((file) => {
    //         const reader = new FileReader()
    //
    //         reader.onabort = () => console.log('file reading was aborted')
    //         reader.onerror = () => console.log('file reading has failed')
    //         reader.onload = async () => {
    //             const byteArr = new Uint8Array(reader.result);
    //             // const byteArr = new Uint8Array(Profile);
    //             const response = await setUserImage(byteArr);
    //             const blob = new Blob([byteArr], {type: "image/jpeg"});
    //             const urlCreator = window.URL || window.webkitURL;
    //             const url = urlCreator.createObjectURL(blob);
    //             setImageSrc(url);
    //             document.getElementById("#profile-image").src = url;
    //             console.log(url);
    //             console.log(imageSrc);
    //         }
    //         reader.readAsArrayBuffer(file)
    //     })
    //
    // }, [])
    
    // const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div className={"page-container"}>
            <div className={"account-container"}>
                <div className={"profile-title"}>
                    <h1> Profile Settings</h1>
                </div>
                <div className={"profile-container"}>
                    <div className={"profile-text"}>
                        <img className={"profile-photo"} src={Profile} alt="profile photo"/>
                        {/*{imageSrc ?*/}
                        {/*    <img className={"profile-photo"} src={Profile} alt="profile photo"/>*/}
                        {/*    :*/}
                        {/*    <img className={"profile-photo"} src={imageSrc} alt="profile photo"/>*/}
                        {/*}*/}
                        <button onClick={toggleImageUpload}>Change Photo</button>
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
            <div id={"image-upload"} className={"edit-profile-form display"}>
                <div>
                    <h2>Upload Image</h2>
                    {/*<div {...getRootProps()} className={"image-upload"}>*/}
                    {/*    <input {...getInputProps()} />*/}
                        <img src={UploadSVG} alt="upload"/>
                    {/*</div>*/}
                    <button onClick={toggleImageUpload}> Exit</button>
                </div>
            </div>
            <div className={"profile-title"}>
                <h1>User List</h1>
                <p>Admin Feature</p>
            </div>
            <div className={"admin-features"}>
                {userList ?
                    (
                        <table>
                            <thead>
                            <tr className={"admin-feature"}>
                                <th><p>ID</p></th>
                                <th><p>Username</p></th>
                                <th><p>Email</p></th>
                                <th><p>Permissions</p></th>
                                <th><p>Give Permission</p></th>
                                <th><p>Delete User</p></th>
                            </tr>
                            </thead>
                            <tbody>
                            {userList.map((user) => (
                                <tr key={user.id} className={"admin-feature"}>
                                    <td><p> {user.id}</p></td>
                                    <td><p> {user.username}</p></td>
                                    <td><p> {user.email}</p></td>
                                    <td><p> {user.role}</p></td>
                                    <td>
                                        <button onClick={() => giveUserAdmin(user.id)} className={"admin-button"}>
                                            Set Admin
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteUser(user.id)} className={"delete-button"}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Request permission for access</p>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileSettings;