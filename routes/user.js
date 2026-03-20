const express= require("express");
const { register,Login,updateprofile,getinfoprofile ,newuser} = require("../controllers/user.controller");
const {validateRegister,validateLogIn,Validateupdateprofile,validateinfoprofile,validateFiledcreateuser}= require("../middleware/users")
const usersRouter= express.Router();
usersRouter.post("/register",validateRegister,register);
usersRouter.post("/login",validateLogIn,Login);
usersRouter.post("/upadate",Validateupdateprofile,updateprofile);
usersRouter.get("/infoProfile",validateinfoprofile,getinfoprofile);
usersRouter.post("/creates",validateFiledcreateuser,newuser);

module.exports=usersRouter;