const express= require("express");
const {authMiddleware,validateadminrole,}= require("../middleware/category");
const { getallcategory,addnewcategory,updatecategorybyid,hidecategory } = require("../controllers/Category.controller");
categoryRoutes=express.Router();
categoryRoutes.get("/all",getallcategory);
categoryRoutes.post("/create",authMiddleware,validateadminrole,addnewcategory);
categoryRoutes.put("/update/:Categoryid",authMiddleware,validateadminrole,updatecategorybyid)
categoryRoutes.delete("/hide/:Categoryid",authMiddleware,validateadminrole,hidecategory)



module.exports=categoryRoutes;
