const Notes=require("../models/notes.js");
const asyncHandler=require("express-async-handler");
const mongoose=require("mongoose")
const connectToDb=async()=>{
    try {
        await mongoose.connect(process.env.mongourl);
        console.log("Success connecting")
    } catch (error) {
        console.log(error);
    }
}
const findAll=async(id)=>{
    try{
    const result=await Notes.find({user:id}).exec()
    return result
    }
    catch(err){
        console.log(err)
    }}

const insertNote=async(note,id)=>{
    try {
        Notes.insertMany({
            text:note,
            user:id
        })
        .then(res=>console.log(res))
    } catch (error) {
        console.log(error)
    }
   
}
exports.addNote=asyncHandler(async(req,res,next)=>{
    await connectToDb()
            try {
                const isLoggedIn=req.user.id
                if(!isLoggedIn){
                    return res.status(301).json({message:"Not Logged In"})
                }
                const result = await insertNote(`${req.body.task}`,isLoggedIn) //double check this
                res.status(200).send(`Note Inserted with text ${req.body.task} for user ${req.user.id}`)
            } catch (error) {
                res.status(400).send("Failed to insert notes")
            }
})
exports.getAllNotes=asyncHandler(async(req,res,next)=>{
    await connectToDb()
    try {
        const result=await findAll(req.user.id)
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(400).send("Failed to grab notes")
    }
})
exports.deleteNote=asyncHandler(async(req,res,next)=>{
    try {
        await Notes.deleteOne({_id:req.params.id})  
        res.status(111).send(`${req.body} has been deleted`)
    } catch (error) {
        console.log(error)
    }
})
exports.updateNote=asyncHandler(async(req,res,next)=>{
    try {
        await Notes.updateOne({_id:req.params.id},{text:req.body.text})
        res.status(200).json({message:`Succesful Update with new text ${req.body.text}`})
    } catch (error) {
        res.status(400).json({message:error})
        console.log(error)
    }
})
