import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './login.css'
const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/profile")
        } else {
            alert("Invalid Credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="wrapper login">
                <div className="container">
                    <div className="col-left">
                        <div className="login-text">
                            <h2>Welcome!</h2>
                            <p>Create your account.<br />For Free!</p> <Link to="/signup" className="btn">Sign Up</Link>
                        </div>
                    </div>
                    <div className="col-right">
                        <div className="login-form">
                            <h2>Login</h2>
                            <form action="" onSubmit={handleSubmit}>
                                <p> <label>Email<span>*</span></label> <input type="text" name='email' value={credentials.email} onChange={onChange} placeholder="Email" required /> </p>
                                <p> <label>Password<span>*</span></label> <input type="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" autoComplete="on" required /> </p>
                                <p> <input type="submit" value="Sign In" /> </p>
                                <p> <Link to="/">Forgot password?</Link> </p>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Login
