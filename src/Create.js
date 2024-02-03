import { useState } from "react"
import "./create.css"
import 'axios'
import axios from "axios"
export const Create=()=>{
    const [task,setTask]=useState("")
    const addNote=async(e)=>{
        e.preventDefault()
        try {
            const res=await axios.post("http://localhost:3100/addNote",{task},{withCredentials:true})
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        
    }
    return(
        <div className="todo-container">
            <form onSubmit={addNote}>
            <div className="todo-container-form">
            <button type="submit" className="todo-button">Add Note</button>
            <input type="text" name="note" id="note" className="todo-input" onChange={(e)=>{setTask(e.target.value)}}></input>
                </div>
            </form>
        </div>
    )
}