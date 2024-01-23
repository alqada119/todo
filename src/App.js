import './App.css';
import { Create } from './Create';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
export default function App() {
  const navigate=useNavigate();
  const [todo,settodo]=useState([]);
  const [cookies,removeCookies]=useCookies([]);
  const [user,setUser]=useState("");
  const getAllNotes=async()=>{
    try {
      const res=await axios.get("http://localhost:3100/getAllNotes");
      settodo(res.data)
    } catch (error) {
      console.log(error)
    }
    
  }
  // const verifyCookie=async()=>{
  //   console.log(cookies)
  //   if(!cookies.token){
  //     navigate("")
  //   }
  //   const {data}=await axios.post("http://localhost:3100",{},{withCredentials:true});
  //   console.log(data)
  //   const{status,user}=data
  //   setUser(user)
  //   if(!status){
  //     removeCookies("token");
  //     navigate("/logIn")
  //   }
  // }
  const LogOut=()=>{
    removeCookies("token");
    navigate("/")
  }
  const deleteNote=async(id)=>{
    try {
      const res=await axios.delete(`http://localhost:3100/deleteNote/${id}`,{params:{id:id}})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllNotes()
    // verifyCookie()
  },[])
  return (
   <>
   <div className='todo-main-cont'>
    <div className='todo-label'><h1>ToDo Today {user}</h1></div>
    {/* will add user */}
    <div className='todo-body'>
  {
    todo.length !== 0 ? (
      <div>
        {
          todo.map((e) => (
            <p key={e._id}>{e.text} <button onClick={()=>{deleteNote(e._id)}}>Delete Note</button></p>
          ))
        }
      </div>
    ) : "All done for today! Proud of you :)"
  }
</div>

    <div className='todo-end'><Create></Create>
    <button><Link to={"/signUp"}>SignUp</Link></button></div>
    <button><Link to={"/logIn"}>Login</Link></button>

   </div>
   </>
  );
}

