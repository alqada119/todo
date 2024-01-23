import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export const Login=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const login=async(e)=>{
        e.preventDefault();
        // console.log(email,password)
        try {
            console.log(email,password)
            const result=await axios.post("http://localhost:3100/logIn",{email:email,password:password})
            if(result.status==200){
    
                setTimeout(()=>{
                    navigate("/")
                },1000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (<div>
        <form onSubmit={login}>
            <h1>LogIn</h1>
            <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}></input>
            <button type="submit">Log-In</button>
        </form>
    </div>)
}