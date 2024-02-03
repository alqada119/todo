const express=require("express");
const { login, signUp, isLoggedIn, logout } = require("../controllers/userController");
const router=express.Router();
router.post("/logIn",login);
router.post("/signUp",signUp);
router.get("/isLoggedIn",isLoggedIn);
router.get("/logout",logout);
//user routes
module.exports=router
