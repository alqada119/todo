const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const dotenv=require("dotenv")
const cookieParser = require("cookie-parser");
const UserRouter = require("./routes/userRoutes.js");
const NoteRouter=require("./routes/noteRoutes.js")
dotenv.config();
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
const connectToDb=async()=>{
    try {
        await mongoose.connect(process.env.mongourl)
        console.log("Success connecting to DB")
    } catch (error) {
        console.log(error)
        throw error
    }
}
app.use(cors({credentials:true,origin:"http://localhost:3000"})) //Very Very Important to set cookies also must include with credentials in frontEnd
app.use("/api/users",UserRouter);
app.use("/api",NoteRouter)
app.listen(process.env.port,()=>{
    console.log("Success connecting Port")
    try {
        connectToDb()
        console.log("Success connecting DB")
    } catch (error) {
        console.log("errorDB")
    }
})
