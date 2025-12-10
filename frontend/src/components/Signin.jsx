import { useState } from "react";
import "../styles/signup.css"
import {useNavigate} from "react-router-dom"
import api from "../api";

export function Signin(){
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        "email": "",
        "password": ""
    })

    function handleChange(e){
        const {name, value} = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value
        })) 
    }

    async function handleSignin(){
        try{
            const response = await api.post("/signin", credentials);
            alert(response.data.message);
            navigate("/user/bookmark")
        }catch(er){
            console.log(er);
        }
    }
    return (
        <div className="signup-div">
            <span className="heading">Sign In</span>
            <div>
                <span>Email:</span>
                <input placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                />
                <span></span>
            </div>
            <div>
                <span>Password:</span>
                <input placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                />
                <span></span>
            </div>
            <button onClick={handleSignin}>Sign In</button>
            <span className="footer-text">Don't have an account? <span onClick={() => navigate("/signup")}>Signup</span></span>
        </div>
    )
}