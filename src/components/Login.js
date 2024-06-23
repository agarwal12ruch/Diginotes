import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            // save the auth token and rediretct
            localStorage.setItem("token",json.authtoken);  // to redirect use history hook is used
            history("/")
            props.applyalert("Logged in","success")
            console.log(json.authtoken);

        }
        else{
            props.applyalert("Invalid credentials","danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="col my-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} placeholder="password" name="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
