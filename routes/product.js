const express= require("express"); // عرفتها مشان استخدم روت تبعها 
const { getallProduct, getCategoryProduct,createNewProduct,updateproduct, hideproduct,getfiltersnameproduct, getproductbyid,} = require("../controllers/product.controller");
const{authMiddleware, validateadminrole}= require("../middleware/Auth_Validate");
const{ValidateAllFiledSchema,checkproduct,Validateupdate}=require("../middleware/product");

const productsRouters=express.Router();
productsRouters.get("/all",getallProduct);
productsRouters.get("/CategoryProduct/:categoryId",getCategoryProduct);
productsRouters.post("/create",authMiddleware, validateadminrole,ValidateAllFiledSchema,checkproduct,createNewProduct);
productsRouters.put("/update/:productId",authMiddleware, validateadminrole,Validateupdate,updateproduct);
productsRouters.delete("/hide/:productid",authMiddleware, validateadminrole,hideproduct);
productsRouters.get("/Filter-name-product",getfiltersnameproduct);
productsRouters.get("/product-details/:productid",getproductbyid)
module.exports=productsRouters;