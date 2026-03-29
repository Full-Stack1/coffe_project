const productmodel= require("../models/ProductSchema");
const categorymodel=require("../models/CategorySchema");
const ValidateAllFiledSchema=(req,res,next)=>
{
  const {name,image,price,sizes,description,category } =req.body;  
   if(!name)
    return res.status(400).json({message: "Please Enter Name Of Product "});
if(!image)
    return res.status(400).json({message: "Please Enter URL Image Of Product "});
   if((!price || price<=0) && (!sizes || sizes.length===0))
    return res.status(400).json({message: "Please Enter price  Or sizes(size the product and price) Of Product "});
if(!description)
    return res.status(400).json({message: "Please Enter Description Of Product "});
if(!category)
    return res.status(400).json({message: "Please Enter category Of Product "});
next();

}
//check category of product in data base
const checkproduct=async (req,res,next)=>
{
   try
   {
    const{category}=req.body;
   if(!category)
    return res.status(400).json({message: "The Categoray ID Is Require"})
const Excategory=await categorymodel.findById(category);
if(!Excategory)
    return res.status(404).json({message: "Not Found Category"});
  next();
}catch(err)
{
    return res.status(500).json({message: "Server Error",err: err.message})

}

}


const Validateupdate=(req,res,next)=>
{
  const {name,image,price,sizes,description } =req.body;  
   if(!name)
    return res.status(400).json({message: "Please Enter Name Of Product "});
if(!image)
    return res.status(400).json({message: "Please Enter URL Image Of Product "});
   if((!price || price<=0) && (!sizes || sizes.length===0))
    return res.status(400).json({message: "Please Enter price  Or sizes(size the product and price) Of Product "});
if(!description)
    return res.status(400).json({message: "Please Enter Description Of Product "});
next();
}

module.exports=
{
    ValidateAllFiledSchema,
    checkproduct,
    Validateupdate,
}