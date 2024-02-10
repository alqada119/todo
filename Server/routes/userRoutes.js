const express=require("express");
const { login, signUp, isLoggedIn, logout, getAllUsers } = require("../controllers/userController");
const router=express.Router();
router.post("/logIn",login);
router.post("/signUp",signUp);
router.get("/isLoggedIn",isLoggedIn);
router.get("/logout",logout);
router.get("/test",getAllUsers);
//user routes
module.exports=router
