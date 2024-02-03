const jwt=require("jsonwebtoken");

const checkAuth=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(404).json({message:"No token"})
    }
    jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
        if(err){
            return res.json({message:"Invalid token"})
        }
        req.user=decoded;
        return next()
    })

}

module.exports=checkAuth