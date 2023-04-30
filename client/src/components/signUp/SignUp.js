import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './signUp.css'
function SignUp() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if(password != cpassword){
            alert("password doesn't matched")
        }else
        {
            const response = await fetch("https://guvi-project.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/profile")
        } else {
            alert("Invalid Cred")
        }
        }
        

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    return (
        <>
            <div className="wrapper signUp">

                <div className="container">
                    <div className="col-left">
                        <div className="signUp-text">
                            <h2>Welcome Back!</h2>
                            <p>To keep connected with us please login<br /> with your personal info</p> <Link to="/" className="btn">Sign In</Link>
                        </div>
                    </div>
                    <div className="col-right">
                        <div className="signUp-form">
                            <h2>Create Account</h2>
                            <form action="" onSubmit={handleSubmit}>
                                <p> <label>Name<span>*</span></label> <input type="text" onChange={onChange} value={credentials.name} name='name' placeholder="Name" minLength={3} required /> </p>
                                <p> <label>Email address<span>*</span></label> <input type="email" onChange={onChange} value={credentials.email} name='email' placeholder="Email" required /> </p>
                                <p> <label>Password<span>*</span></label> <input type="password" onChange={onChange} value={credentials.password} name='password' placeholder="Password" minLength={5} required /> </p>
                                <p> <label>Confirm Password<span>*</span></label> <input type="password" onChange={onChange} value={credentials.cpassword} name='cpassword' placeholder="Confirm Password" minLength={5} required /> </p>
                                <p> <input type="submit" value="Sign Up" /> </p>

                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default SignUp