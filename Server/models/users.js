const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const UserSchema=new mongoose.Schema({
    email:String,
    password:String
})
UserSchema.pre("save",async function(){
    this.password=await bcrypt.hash(this.password,12)
})
const Users=mongoose.model("Users",UserSchema);
module.exports=Users