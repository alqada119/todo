import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./login.css"
export const Login=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const [cookie,removeCookie]=useCookies();
    const[isLoggedIn,setLog]=useState(false)
    const login=async(e)=>{
        e.preventDefault();
        // console.log(email,password)
        try {
            const result = await axios.post("http://localhost:3100/users/logIn", { email: email, password: password },{withCredentials:true});
            if(result.status==200){
                setTimeout(()=>{
                    // navigate("/")
                    console.log("Success",)
                    navigate("/")
                },1000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (<div className="body login">
        <form className="form login" onSubmit={login}>
            <h1 className="h1 login">LogIn</h1>
            <input type="text" name="email" className="input login" onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" name="password" className="input login" onChange={(e)=>setPassword(e.target.value)}></input>
            <button className="button login" type="submit">Log-In</button>
        </form>
    </div>)
}