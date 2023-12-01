import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Login() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        })
        const result = await response.json()

        if (!result.success) {
            toast.error(result.msg, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                className: "toast--message",
            });
        } else {
            localStorage.setItem("hungerFoodToken", result.authToken)
            toast.success("logged in successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
                className: "toast--message",
            });
            navigate("/")
        }
    }
    useEffect(() => {
        if (localStorage.getItem("hungerFoodToken")) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className='container mt-3 bg-light rounded'>
            <ToastContainer />
            <h2>Login .</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="login-email" className="form-label">Email address</label>
                    <input type="email" name='email' value={credentials.email} onChange={handleChange} className="form-control" id="login-email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="login-password" className="form-label">Password</label>
                    <input type="password" name='password' value={credentials.password} onChange={handleChange} className="form-control" id="login-password" />
                </div>


                <button type="submit" className="btn btn-primary fw-bold">Login</button>
                <Link className='btn btn-danger m-2' to="/signup">create new account</Link>
            </form>
        </div>
    )
}
