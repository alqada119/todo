const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv")
const Notes=require("./models/notes.js")
const Users=require("./models/users.js")
const passport=require("passport")
const session=require("express-session")
const LocalStrategy = require("passport-local").Strategy;
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
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//Auth
passport.use(new LocalStrategy(async(email,password,done)=>{
    try {
        const user=await Users.findOne({email:email})
    if(!user){
        return done(null,false,{message:"Incorrect email"})
    }
    if(user.password!==password){
        return done(null,false,{message:"Incorrect Password"})
    }
    return done(null,user)
    } catch (error) {
        console.log(error)
    }
    
}))
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });
//All above are standard for auth
app.post("/logIn",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })
  )
app.post("/signUp",async(req,res)=>{
    console.log(req.body.email,req.body.password)
    try {
    const user = new Users({
      email: req.body.email,
      password: req.body.password
       });
    const result = await user.save();
    console.log(req.body.email,req.body.password)
    res.status(200).send("Sign-up succesful")
    } catch (error) {
        res.status(404).send(error)
    }
})
app.post("/logIn")
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
app.listen(process.env.port,()=>{
    console.log("Success connecting Port")
    try {
        connectToDb()
        console.log("Success connecting DB")
    } catch (error) {
        console.log("error")
    }
})
