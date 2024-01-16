import { useState } from "react"
import axios from "axios";
export const SignUp=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const signUp=async(e)=>{
        e.preventDefault();
        // console.log(email,password)
        try {
            const result=await axios.post("http://localhost:3100/signUp",{email:email,password:password})
            console.log(result)
        } catch (error) {
            console.log("error")
        }
    }
    return (<div>
        <form onSubmit={signUp}>
            <h1>Sign-Up</h1>
            <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}></input>
            <button type="submit">Sign-Up</button>
        </form>
    </div>)
}