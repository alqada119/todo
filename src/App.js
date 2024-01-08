import logo from './logo.svg';
import './App.css';
import { Create } from './Create';
import { useState } from 'react';
function App() {
  const [todo,settodo]=useState([])
  return (
   <>
   <div className='todo-main-cont'>
    <div className='todo-label'><h1>ToDo Today</h1></div>
    {/* will add user */}
    <div className='todo-body'>
        {
          todo.length!=0?<div>{todo.map((todos)=>{
            <div>{todos}</div>
          })}</div>:"All done for today! Proud of you :)"
          
        }
    </div>
    <div className='todo-end'><Create></Create></div>
   </div>
   </>
  );
}

export default App;
