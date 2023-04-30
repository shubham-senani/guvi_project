import React, { useEffect } from 'react'
import "./profile.css"
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Profile = () => {

    let navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        Data();
    }, [])
    //get all Data
    const Data = async () => {
        const response = await fetch('https://guvi-project.onrender.com/api/auth/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setData(json)
    }

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container">
            <form action=''>
                <div className="row">
                    <div className="col-md-4 profile-side">
                        <div className="profile-img">
                            <img src="unnamed.jpg" alt="" />
                            <div className="file btn">
                                <img src="./edit.svg" alt="" />
                                <input type="file" name="file" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>
                                {data.name}
                            </h5>
                            <h6>
                                Web Developer and Designer
                            </h6>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Link to={`/update`} className="profile-edit-btn">Update</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 side">
                        <div className="side-bar">
                            <a href="/">Home</a>
                            <a href="/">Dashboard</a>
                            <a href="/">Support</a>
                            <Link onClick={logout} to="">Sign Out</Link>
                        </div>
                    </div>
                    <div className="col-md-8 mt-4">
                        <div className="row info">
                            <div className="col-md-6">
                                <label>Name</label>
                            </div>
                            <div className="col-md-6">
                                <p>{data.name}</p>
                            </div>
                        </div>
                        <div className="row info">
                            <div className="col-md-6">
                                <label>Age</label>
                            </div>
                            <div className="col-md-6">
                                <p>{data.age}</p>
                            </div>
                        </div>
                        <div className="row info">
                            <div className="col-md-6">
                                <label>Gender</label>
                            </div>
                            <div className="col-md-6">
                                <p> {data.gender} </p>
                            </div>
                        </div>
                        <div className="row info">
                            <div className="col-md-6">
                                <label>Email</label>
                            </div>
                            <div className="col-md-6">
                                <p> {data.email} </p>
                            </div>
                        </div>
                        <div className="row info">
                            <div className="col-md-6">
                                <label>Phone</label>
                            </div>
                            <div className="col-md-6">
                                <p> {data.phone}</p>
                            </div>
                        </div>
                        <div className="row info">
                            <div className="col-md-6">
                                <label>Location</label>
                            </div>
                            <div className="col-md-6">
                                <p> {data.location} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile

