import "./profile-settings.css";
import React, {useEffect, useState} from "react";
import {getUserDetails} from "../../services/user-service.js";
import Profile from "../../assets/profile-pics/profile0.jpg";
import {Link} from "react-router-dom";
import {listUserProperties} from "../../services/propertyauth.js";
import {fetchAssets, fetchUserAssets, fetchUserInvestments} from "../../services/investmentService.js";

const AdminView = (user) => {
    const [profileData, setProfileData] = useState({
        id: "",
        username: "",
        email: "",
        permission: ""
    });
    const [properties, setProperties] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getUserDetails(user.userId);
            setProfileData({
                ...profileData,
                id: response.id,
                username: response.username,
                email: response.email,
                permission: response.role
            });
            const propertyResponse = await listUserProperties(user.userId);
            setProperties(propertyResponse);
            const investmentsResponse = await fetchUserInvestments(user.userId);
            setInvestments(investmentsResponse);
            const assetsResponse = await fetchUserAssets(user.userId);
            setAssets(assetsResponse);
            console.log(propertyResponse);
        } catch (error) {
            console.log("Could not load data: " + error);
        }
    }

    return (
        <div className="page-container">
            <div className="account-container">
                <div className={"profile-title admin-title"}>
                    <h1>Profile Data of {profileData.username}</h1>
                </div>
            </div>
            <div className={"profile-container"}>
                <div className={"profile-text"}>
                    <img className={"profile-photo"} src={Profile} alt="profile photo"/>
                    {/*{imageSrc ?*/}
                    {/*    <img className={"profile-photo"} src={Profile} alt="profile photo"/>*/}
                    {/*    :*/}
                    {/*    <img className={"profile-photo"} src={imageSrc} alt="profile photo"/>*/}
                    {/*}*/}
                    {/*<button onClick={toggleImageUpload}>Change Photo</button>*/}
                </div>
                <div className={"profile-text"}>
                    <div className={"profile-component"}>
                        <h2>Profile Username: </h2>
                        <p>{profileData.username}</p>
                    </div>
                    <div className={"profile-component"}>
                        <h2>Profile Email: </h2>
                        <p>{profileData.email}</p>
                    </div>
                    <div className={"profile-component"}>
                        <h2>Permission Level: </h2>
                        <p>{profileData.permission}</p>
                    </div>
                </div>
            </div>
            <div className={"admin-features admin-tables"}>
                <h1>Properties</h1>
                {properties ?
                    (
                        <table>
                            <thead>
                            <tr className={"admin-feature"}>
                                <th><p>Id</p></th>
                                <th><p>Address</p></th>
                                <th><p>State</p></th>
                                <th><p>City</p></th>
                                <th><p>Value</p></th>
                            </tr>
                            </thead>
                            <tbody>
                            {properties.map((property) => (
                                <tr key={property.id} className={"admin-feature"}>
                                    <td><p> {property.id}</p></td>
                                    <td><p> {property.address}</p></td>
                                    {property.state ?
                                        (
                                            <td><p> {property.state}</p></td>
                                        ) : (
                                            <td><p> not specified </p></td>
                                        )
                                    }
                                    {property.city ?
                                        (
                                            <td><p> {property.city}</p></td>
                                        ) : (
                                            <td><p> not specified </p></td>
                                        )
                                    }
                                    <td><p>{property.propertyValue}</p></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No Properties</p>
                    )
                }
            </div>
            <div className={"admin-features admin-tables"}>
                <h1>Investments</h1>
                {investments ?
                    (
                        <table>
                            <thead>
                            <tr className={"admin-feature"}>
                                <th><p>Id</p></th>
                                <th><p>Name</p></th>
                                <th><p>Investment Type</p></th>
                                <th><p>Current Value</p></th>
                                <th><p>Returns</p></th>
                            </tr>
                            </thead>
                            <tbody>
                            {investments.map((investment) => (
                                <tr key={investment.id} className={"admin-feature"}>
                                    <td><p> {investment.id}</p></td>
                                    <td><p> {investment.investmentName}</p></td>
                                    <td><p> {investment.type}</p></td>
                                    <td><p> ${investment.currentValue}</p></td>
                                    <td><p> ${Math.round(investment.returns*100)/100}</p></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No Investments</p>
                    )
                }
            </div>
            <div className={"admin-features admin-tables"}>
                <h1>Assets</h1>
                {assets ?
                    (
                        <table>
                            <thead>
                            <tr className={"admin-feature"}>
                                <th><p>Id</p></th>
                                <th><p>Asset Type</p></th>
                                <th><p>Current Value</p></th>
                                <th><p>Allocation</p></th>
                            </tr>
                            </thead>
                            <tbody>
                            {assets.map((asset) => (
                                <tr key={asset.id} className={"admin-feature"}>
                                    <td><p> {asset.id}</p></td>
                                    <td><p> {asset.type}</p></td>
                                    <td><p> ${asset.currentValue}</p></td>
                                    <td><p> {asset.allocation}%</p></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No Investments</p>
                    )
                }
            </div>
        </div>
    )
}

export default AdminView;
