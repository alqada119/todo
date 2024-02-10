const Users=require("../models/users.js")
const asyncHandler=require("express-async-handler");
const bcrypt=require("bcryptjs")
const {createSecretToken}=require("../util/SecretToken");
const jwt=require("jsonwebtoken");
exports.login=asyncHandler(async(req,res,next)=>{
    console.log(process.env.TOKEN_KEY)
    const {email,password}=req.body
    console.log(email,password)
    console.log("Testing")
    try {
        const user=await Users.findOne({email:email})
        if(!user){
            return res.status(401).send({message:"Incorrect fields"})
        }
        const auth=await bcrypt.compare(password,user.password)
        if(!auth){
            return res.status(401).json({message:"Wrong Password"})
        }
        const token = createSecretToken(user._id);
        return res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,path:"/"}).status(200).json({message:"Login Success with cookie"});
    } catch (error) {
        console.log(error)
        res.status(404).json({message:error})
    }
})
exports.logout=asyncHandler(async(req,res,next)=>{
    if (req.cookies.token){
        res.clearCookie("token");
        return res.status(200).json({message:"Logged out"})
    }
    return res.status(400).json({message:"Not logged In"})
    
})
exports.isLoggedIn=asyncHandler(async(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.json(false)
    }
    jwt.verify(token,process.env.TOKEN_KEY,(err)=>{
        if (err){
            return res.json(false)
        }
        return res.json(true)

    })
})
exports.signUp=asyncHandler(async(req,res,next)=>{
    try {
        const {email,password}=req.body
        const existingUser=await Users.find({email:email})
        if (existingUser.length>0){
            console.log("User Found")
            return res.json({message:"User Already Exists"})
        }
        else{
            console.log("User not found")
            const user = await Users.create({email:email,password:password})
            const token=createSecretToken(user._id)
            res.cookie("token",token,{
            withCredentials:true,
            httpOnly:false,
        })
        res.status(200).json({message:"User Signed In Success",success:true})
        next()
        }
        } catch (error) {
            res.status(404).send(error)
        }
})