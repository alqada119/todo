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
    try {
        await mongoose.connect(process.env.mongourl)
        console.log("Success connecting to DB")
    } catch (error) {
        console.log(error)
        throw error
    }
}
const findAll=async()=>{
    try{
    const result=await Notes.find({}).exec()
    return result
    }
    catch(err){
        console.log(err)
    }}

const insertNote=async(note)=>{
    try {
        Notes.insertMany({
            text:note
        })
        .then(res=>console.log(res))
    } catch (error) {
        console.log(error)
    }
   
}
const deleteNote=async(noteID)=>{
    if (!noteID){
        console.log("NoteID invalid")
    }
    else{
        try {
            Notes.deleteOne({_id:noteID})
        } catch (error) {
            console.log(error)
        }
    }
}
app.use(cors())
app.use(express.json())
//          ---------------------------------------------------ROUTES------------------------------------------------------------------
app.get("/getAllNotes",async(req,res)=>{
            await connectToDb()
            try {
                const result=await findAll()
                console.log(result)
                res.status(200).send(result)
            } catch (error) {
                console.log(error)
                res.status(400).send("Failed to grab notes")
            }
        })
app.post("/addNote",(req,res)=>{
    try {
        connectToDb
        .then(()=>{
            try {
                insertNote(`${req.body}`) //double check this
                res.status(200).send("Note Inserted")
            } catch (error) {
                res.status(400).send("Failed to insert notes")
            }
        })
    } catch (error) {
        res.status(404).send("Failed")
    }
})
app.get("/get",(req,res)=>{
    res.send("Hello")
})
app.post("/deleteNote",(req,res)=>{
    try {
        connectToDb
        .then(()=>{
            try {
                insertNote(`${req.body}`) //double check this
                res.status(200).send("Note Deleted")
            } catch (error) {
                res.status(400).send("Failed to delete notes")
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
