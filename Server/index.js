const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv")
const Notes=require("./models/notes.js")
const Users=require("./models/users.js")
dotenv.config();
console.log(process.env.port,process.env.mongourl);
const connectToDb=async()=>{
    mongoose.connect(process.env.mongourl)
    .then(()=>console.log("Success connecting to DB"))
    .catch((err)=>{
        console.log(err)
    })
}
app.use(cors())
app.use(express.json())
app.get("/getAllNotes",(req,res)=>{
    try {
        connectToDb
        .then(()=>{
            try {
                Notes.find({})
                res.status(200).send("All Notes Fetched")
            } catch (error) {
                res.status(400).send("Failed to grab notes")
            }
        })
    } catch (error) {
        res.status(404).send("Failed")
    }
})
app.listen(process.env.port,()=>{
    console.log("Success connecting Port")
    try {
        connectToDb()
        console.log("Success connecting DB")
    } catch (error) {
        console.log("error")
    }
})
