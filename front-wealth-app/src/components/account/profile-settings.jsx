import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import "./profile-settings.css";
import {
  deleteUserProfile,
  getUserProfile,
  getUserProfiles,
  setUserAdmin,
  setUserImage,
  updateUserProfile,
} from "../../services/user-service.js";
import Profile from "../../assets/profile-pics/profile0.jpg";
import FormCards from "../user/FormsForDashboard.jsx";
import welcomeImage from "../user/images/gradient.jpg";
import UploadSVG from "../../assets/upload.svg?react";
import { useDropzone } from "react-dropzone";
import AdminView from "./admin-view.jsx";
import { useLocation, Link } from "react-router-dom";

const ProfileSettings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  const [userList, setUserList] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [imageSrc, setImageSrc] = useState(null);

  const loadProfile = async () => {
    try {
      const response = await getUserProfile();
      setUsername(response.username);
      setEmail(response.email);
      setRole(response.role);
      setNewEmail(response.email);
    } catch (err) {
      setError("Could not load user");
      console.log(err);
    }
  };

  const loadUserList = async () => {
    try {
      const list = await getUserProfiles();
      setUserList(list);
      console.log(list);
    } catch (error) {
      setError("Could not load user List");
      console.log(error);
    }
  };

  const giveUserAdmin = async (id) => {
    try {
      const response = await setUserAdmin(id).then(() => loadUserList());
      console.log(response);
    } catch (error) {
      setError("Error setting admin");
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await deleteUserProfile(id).then(() => loadUserList());
      console.log(response);
    } catch (error) {
      setError("Error deleting user");
      console.log(error);
    }
  };

  useEffect(() => {
    loadProfile();
    loadUserList();
    setImageSrc("");
  }, []);

  const formFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      value: newEmail,
      onChange: (e) => setNewEmail(e.target.value),
    },
  ];

  const toggleProfileEdit = () => {
    document.getElementById("edit-profile").classList.toggle("display");
  };

  const toggleImageUpload = () => {
    document.getElementById("image-upload").classList.toggle("display");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    if (newEmail !== "") data.email = newEmail;
    console.log(data);
    try {
      const response = await updateUserProfile(data);
      setEmail(response.email);
      setNewEmail(response.email);
    } catch (error) {
      console.log(error);
      setError("Problem has occured updating the account");
    }
    toggleProfileEdit();
    loadProfile();
  };

  return (
    <div className={"page-container"}>
      <div className={"account-container"}>
        <div className={"profile-title"}>
          <h1> Profile Settings</h1>
        </div>
        <div className={"profile-container"}>
          <div className={"profile-text"}>
            <img
              className={"profile-photo"}
              src={Profile}
              alt="profile photo"
            />
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
          <FormCards
            handleText="Edit Account Settings"
            welcomeImage={welcomeImage}
            handleSubmit={handleSubmit}
            formFields={formFields}
            submitButtonText={username || email ? "Change" : "Change one field"}
          />
          <button onClick={toggleProfileEdit}> Exit</button>
        </div>
      </div>
      <div id={"image-upload"} className={"edit-profile-form display"}>
        <div>
          <h2>Upload Image</h2>
          <img src={UploadSVG} alt="upload" />
          <button onClick={toggleImageUpload}> Exit</button>
        </div>
      </div>
      <div className={"profile-title admin-title"}>
        <h1>User List</h1>
        <p>Admin Feature (Select Username for More Details)</p>
      </div>
      <div className={"admin-features"}>
        {userList ? (
          <table>
            <thead>
              <tr className={"admin-feature"}>
                <th>
                  <p>ID</p>
                </th>
                <th>
                  <p>Username</p>
                </th>
                <th>
                  <p>Email</p>
                </th>
                <th>
                  <p>Permissions</p>
                </th>
                <th>
                  <p>Give Permission</p>
                </th>
                <th>
                  <p>Delete User</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id} className={"admin-feature"}>
                  <td>
                    <p> {user.id}</p>
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: `/profile/${user.id}`,
                        state: { from: user.id },
                      }}
                    >
                      <p className={"username-select"}> {user.username}</p>
                    </Link>
                  </td>
                  <td>
                    <p> {user.email}</p>
                  </td>
                  <td>
                    <p> {user.role}</p>
                  </td>
                  <td>
                    <button
                      onClick={() => giveUserAdmin(user.id)}
                      className={"admin-button"}
                    >
                      Set Admin
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className={"delete-button"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Request permission for access</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
