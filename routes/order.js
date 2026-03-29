const express= require("express");
const {authMiddleware,validateadminrole}= require("../middleware/Auth_Validate");
const {getAllOrders,createorder,updateorder,hidecategory}= require("../controllers/Order.controller");
orderRoutes=express.Router();
orderRoutes.get("/all", getAllOrders);
orderRoutes.post("/create",createorder );
orderRoutes.put("/update",authMiddleware,validateadminrole,updateorder );
orderRoutes.delete("/update",authMiddleware,validateadminrole,hidecategory );
 module.exports=orderRoutes;
