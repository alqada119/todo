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
  const [render,rerender]=useState(false);
  const updateNote=async(id)=>{
    console.log(id)
    try {
      // const text=prompt("Enter updated text")
      const text="Testing right now"
      const res=await axios.put(`http://localhost:3100/api/updateNote/${id}`,{text:text},{withCredentials:true})
      rerender(true);
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  const logOut=async()=>{
    try {
      const req=await axios.get("http://localhost:3100/api/users/logout",{withCredentials:true})
      console.log(req)
      setTimeout(()=>{
        window.location.reload()
      },1000)
    } catch (error) {
      console.log(error)
    }
  }
  const checkLogIn=async()=>{
    try {
      const log=await axios.get("http://localhost:3100/api/users/isLoggedIn",{withCredentials:true})
      console.log(log)
    } catch (error) {
      console.log(error)
    }
    
  }
  const getAllNotes=async()=>{
    try {
      const res=await axios.get("http://localhost:3100/api/getAllNotes",{withCredentials:true});
      settodo(res.data)
    } catch (error) {
      console.log(error)
    }
    
  }
  const deleteNote=async(id)=>{
    try {
      const res=await axios.delete(`http://localhost:3100/api/deleteNote/${id}`,{withCredentials:true})
      rerender(true);
      console.log(res)
    } catch (error) {
      window.location.reload()
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllNotes()
    checkLogIn()
    console.log(document.cookie)
    // verifyCookie()
  },[]);
  useEffect(()=>{
    getAllNotes()
  },[render]);
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
    <div>
    <Create></Create>
    </div>
    <div className='todo-end'>
    <button className='todo-endd signUp'><Link to={"/signUp"}>SignUp</Link></button>
    <button className='todo-endd log'><Link to={"/logIn"}>Login</Link></button>
    <button className='todo-endd logOut'onClick={logOut}>LogOut</button>
    </div>
   </div>
   </>
  );
}

