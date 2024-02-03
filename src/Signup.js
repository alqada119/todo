import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export const SignUp=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
        const handleSuccess=(msg)=>{
        toast.success(msg,{position:"bottom-right",icon:"🟢"})
    }
    const handleError=(err)=>{
        toast.error(err,{position:"bottom-left"})
    }
    const signUp=async(e)=>{
        e.preventDefault();
        // console.log(email,password)
        try {
            const result=await axios.post("http://localhost:3100/users/signUp",{email:email,password:password})
            console.log(result)
            if (result.status==201){
                handleSuccess("Signed Up Succesfuly")
                setTimeout(()=>{
                    navigate("/")
                },1000)
            }
            else{
                handleError("Error Signing up")
            }
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
        <ToastContainer />
    </div>)
}