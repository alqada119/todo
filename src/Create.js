import { useState } from "react"
import "./create.css"
import 'axios'
import axios from "axios"
export const Create=()=>{
    const [task,setTask]=useState("")
    const addNote=async()=>{
        try {
            axios.post("http://localhost:3100/postNote",{task:task})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
        } catch (error) {
            console.log(error)
        }
        
    }
    return(
        <div className="todo-container">
            <form>
            <div className="todo-container-form">
            <button className="todo-button" onClick={addNote}>Add Note</button>
            <input type="text" name="note" id="note" className="todo-input" onChange={(e)=>setTask(e.target.value)}></input>
                </div>
            </form>
        </div>
    )
}