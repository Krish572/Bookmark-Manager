import "../styles/signup.css"
import { useNavigate } from "react-router-dom"
import api from "../api";
import { useState } from "react";

export function Signup(){
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        "name": "",
        "email": "",
        "password": ""
    });

    function handleChange(e){
        const {name, value} = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    }


    async function handleSignup(){
        try{
            const response = await api.post("/signup", userInfo);
            alert(response.data.message);
        }catch(err){
            console.log("error while sign up - "+err);
        }
    }

    return (
        <div className="signup-div">
            <span className="heading">Sign Up</span>
            <div>
                <span>Name:</span>
                <input name="name" onChange={handleChange} placeholder="Enter your name"/>
                <span></span>
            </div>
            <div>
                <span>Email:</span>
                <input name="email" onChange={handleChange} placeholder="Enter your email"/>
                <span></span>
            </div>
            <div>
                <span>Password:</span>
                <input name="password" onChange={handleChange} placeholder="Enter your password"/>
                <span></span>
            </div>
            <button onClick={handleSignup}>Sign Up</button>
            <span className="footer-text">Already have an account? <span onClick={() => navigate("/signin")}>Signin</span></span>
        </div>
    )
}