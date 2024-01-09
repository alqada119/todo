const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv")
const Notes=require("./models/notes.js")
const Users=require
dotenv.config();
console.log(process.env.port,process.env.mongourl);
app.use(cors())
app.use(express.json())
app.listen(process.env.port,()=>{
    console.log("Success connecting Port")
    try {
        mongoose.connect(process.env.mongourl)
        .then(res=>{
            Notes.createCollection()
            .then(()=>{
                console.log("Success Creating collection")
            })
            .catch((err)=>{(
                console.log(err)
            )
        })})
        console.log("Success connecting DB")
    } catch (error) {
        console.log("error")
    }
})
