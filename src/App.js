import './App.css';
import { Create } from './Create';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function App() {
  
  const [todo,settodo]=useState([]);
  const getAllNotes=async()=>{
    try {
      const res=await axios.get("http://localhost:3100/getAllNotes");
      settodo(res.data)
    } catch (error) {
      console.log(error)
    }
    
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
  },[])
  return (
   <>
   <div className='todo-main-cont'>
    <div className='todo-label'><h1>ToDo Today</h1></div>
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
   </div>
   </>
  );
}

