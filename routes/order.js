const express= require("express");
const {authMiddleware,validateadminrole}= require("../middleware/Auth_Validate" );
const {getAllOrders,createorder,updateorder,hidecategory,listorder}= require("../controllers/Order.controller");
orderRoutes=express.Router();
orderRoutes.get("/all", getAllOrders);
orderRoutes.post("/create",authMiddleware,createorder );
orderRoutes.put("/update",authMiddleware,validateadminrole,updateorder );
orderRoutes.delete("/hide-order",authMiddleware,validateadminrole,hidecategory );
orderRoutes.get("/show-pre-order",authMiddleware,listorder)
 module.exports=orderRoutes;
