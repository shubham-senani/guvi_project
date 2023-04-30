// import React, { useEffect, useState } from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Edit = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        Data()
    }, [])
    //get all Data
    const Data = async () => {
        const response = await fetch('http://localhost:8080/api/auth/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setData(json)
    }

    const [updatedData, setUpdatedData] = useState(data)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { name, email, age, gender, location, phone } = updatedData;
        try {
            const response = await fetch(`http://localhost:8080/api/auth/update/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ name, email, age, gender, location, phone })
            });

            const json = await response.json();
            navigate("/profile");
        } catch (error) {
            console.log("error")
        }

    }


    const onchange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })
    }

    return (
        <div className='container p-5'>
            <form action='' onSubmit={handleSubmit}>
                <div className="modal-header text-center">
                    <h5 className="modal-title text-success font-weight-bold" id="exampleModalLabel">Edit Profile</h5>
                </div>
                <div className="modal-body">
                    <div className='my-2 row'>
                        <div className="mb-1">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={updatedData.name} onChange={onchange} name="name" />
                        </div>
                        <div className="mb-1 ">
                            <label htmlFor="title" className="form-label">Age</label>
                            <input type="number" value={updatedData.age} className="form-control" id="age" onChange={onchange} name="age" />
                        </div>
                        <div className="my-2 mb-2">
                            <select class="form-select" id='gender' value={updatedData.gender} onChange={onchange} name="gender">
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="title" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={updatedData.email} onChange={onchange} name="email" />
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="title" className="form-label">Phone</label>
                            <input type="number" className="form-control" id="phone" value={updatedData.phone} onChange={onchange} name="phone" />
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="title" className="form-label">Location</label>
                            <input type="text" className="form-control" id="location" value={updatedData.location} onChange={onchange} name="location" />
                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    <Link to="/profile" type="button" className="btn btn-dark m-2 text-light">Close</Link>
                    <input className='btn bg-success  m-2 text-light' type="submit" value="Save" />

                </div>

            </form>
        </div>
    )
}

export default Edit
