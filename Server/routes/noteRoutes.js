const express=require("express");
const router = express.Router();
const checkAuth=require("../util/checkAuth.js")
const noteController=require("../controllers/noteController.js")
router.get("/getAllNotes",checkAuth,noteController.getAllNotes)
router.post("/addNote",checkAuth,noteController.addNote)
router.delete("/deleteNote/:id",checkAuth,noteController.deleteNote)
router.put("/updateNote/:id",checkAuth,noteController.updateNote)
module.exports=router