const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv")
const Notes=require("./models/notes.js")
const Users=require("./models/users.js");
const { createSecretToken } = require("./util/SecretToken.js");
const cookieparse=require("cookie-parser");
const cookieParser = require("cookie-parser");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
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
            const result=await Notes.deleteOne({_id:noteID})
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
}
app.use(cors())
app.use(express.json())
app.use(cookieParser());
//Auth
//All above are standard for auth
app.post("/", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ status: false });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            try {
                const user = await Users.findById(data.id);

                if (user) {
                    return res.json({ status: true, user: user.username });
                } else {
                    return res.json({ status: false });
                }
            } catch (error) {
                console.error(error);
                return res.json({ status: false });
            }
        }
    });
});
app.post("/logIn",async(req, res,next) => {
    const {email,password}=req.body
    console.log(email,password)
    try {
        const user=await Users.findOne({email:email})
        console.log(user)
        if(!user){
            return res.status(401).json({message:"Incorrect fields"})
        }
        const auth=await bcrypt.compare(password,user.password)
        console.log(auth)
        if(!auth){
            return res.status(401).json({message:"Wrong Password"})
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
     });
     
     res.status(200).json({message:`User with ${email} logged in successfuly`});
     next();
    } catch (error) {
        res.status(404).json({message:error})
    }
});

app.post("/signUp",async(req,res,next)=>{
    try {
    const {email,password}=req.body
    console.log(email,password)
    const existingUser=await Users.find({email:email})
    console.log(existingUser)
    if (existingUser.length>0){
        console.log("User Found")
        return res.json({message:"User Already Exists"})
    }
    else{
        console.log("User not found")
        const user = await Users.create({email:email,password:password})
        console.log(user)
        const token=createSecretToken(user._id)
        res.cookie("token",token,{
        withCredentials:true,
        httpOnly:false
    })
    res.status(201).json({message:"User Signed In Success",success:true})
    next()
    }
    } catch (error) {
        res.status(404).send(error)
    }
})
//          ---------------------------------------------------ROUTES------------------------------------------------------------------
app.get("/getAllNotes",async(req,res)=>{
            await connectToDb()
            try {
                const result=await findAll()
                console.log(result)
                res.status(200).json(result)
            } catch (error) {
                console.log(error)
                res.status(400).send("Failed to grab notes")
            }
        })
app.post("/addNote",async (req,res)=>{
        await connectToDb()
            try {
                const result = await insertNote(`${req.body.task}`) //double check this
                res.status(200).send("Note Inserted")
            } catch (error) {
                res.status(400).send("Failed to insert notes")
            }
        }
    )
app.get("/get",(req,res)=>{ //Test
    res.send("Hello")
})
app.delete("/deleteNote/:id",async (req,res)=>{
    try {
        await Notes.deleteOne({_id:req.params.id})  
        res.status(111).send(`${req.body} has been deleted`)
    } catch (error) {
        console.log(error)
    }
    
})
app.options("/deleteNote",cors())
app.options("/logIn",cors())
app.options("/",cors)
app.listen(process.env.port,()=>{
    console.log("Success connecting Port")
    try {
        connectToDb()
        console.log("Success connecting DB")
    } catch (error) {
        console.log("errorDB")
    }
})
