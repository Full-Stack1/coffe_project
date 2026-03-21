const express= require("express");
const { register,Login,updateprofile,getinfoprofile ,addnewuser} = require("../controllers/user.controller");
const {authMiddleware,validateadminrole}=require("../middleware/Auth_Validate");
const {validateRegister,validateLogIn,Validateupdateprofile,validateinfoprofile,validateFiledcreateuser}= require("../middleware/users")
const usersRouter= express.Router();
usersRouter.post("/register",validateRegister,register);
usersRouter.post("/login",validateLogIn,Login);
usersRouter.put("//update/:userid",Validateupdateprofile,updateprofile);
usersRouter.get("/:userId",validateinfoprofile,getinfoprofile);
usersRouter.post("/creates",authMiddleware,validateadminrole,validateFiledcreateuser,addnewuser);

module.exports=usersRouter;