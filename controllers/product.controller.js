const { json } = require("express");
const productmodel = require("../models/ProductSchema")
//get all product
const getallProduct= async(req,res)=>
{
    try
    {
        const products= await productmodel.find({isAvailable : true}); 
        res.status(200).json({
            message: "Return All Products Was Successfully ",
            data: products
        }) 

    }catch(error)
    {
       res.status(500).json({message: "Server Error",error: error.message})
    }

}
//get product based on category
const getCategoryProduct=async(req,res)=>
{    
 try
{  
    const {categoryId}=req.params;
    if(!categoryId)
        return res.status(400).json({message: "The Category ID Is Require "})
    const productCategory= await productmodel.find({category:  categoryId});
    if(!productCategory)
        return res.status(404).json({message:"No Product in This Category "})
    res.status(200).json({
  message: "Products fetched successfully",
  data: productCategory
});
} catch(error)
{
    res.status(500).json({message: "Server Error ", error: error.message})
}
}

//create new product 
const createNewProduct= async (req,res)=>
{ 
 try
{
  const {name,image,price,sizes,description,category } =req.body; 
  console.log(req.body); 
const Exproduct = await productmodel.findOne({name});
if(Exproduct)
{
    return res.status(400).json({
     
        message: "The Product is alrady was added "
    })
}

const newproduct=  await productmodel.create({name,image,price,sizes,description,category })  
if(!newproduct)
    return res.status(404).json({message : "Failed Add New Product"})
   return res.status(201).json({
    message: " The New product is Created",
    data: newproduct
})
}catch(err)
{  console.log(err);
  res.status(500).json({message: "Server Error",err: err.message})    
} 
}

//Update   product
const updateproduct=async (req,res)=>
{
 try
 { 
    const{name,image,price,sizes,description}=req.body
    const {productId} =req.params;
    if(!productId)
        return res.status(400).json({message: "The Product ID IS Require"})
 const updateproduct= await productmodel.findOneAndUpdate(   
  {_id:productId},  
  {name,image,price,sizes,description} ,
  {new : true}   
 )
 if(!updateproduct)
  return res.status(404).json({message: "Product not found"});
 res.status(200).json({
    message:"The UpDate is done ",
    data: updateproduct
   })
 }catch(error)
 {
   res.status(500).json({message: "Server Error",error: error.message})
 }

}
//hide product 
const hideproduct = async(req,res)=>{
    try
    {
      const {productid} = req.params;  
       if(!productid)
        return res.status(400).json({message:"The ID is Required"})
      await productmodel.findByIdAndUpdate(
        {_id : productid},
        {isAvailable : false}
      )
      res.status(200).json({message:"done deleted"})

    }catch(err){
        res.status(500).json({
            message:"Server Error",
            err:err.message
        })
    }
}
 

//filter based on name product when search 
const getfiltersnameproduct= async(req,res)=>{
 try
 {
    const{name}=req.query;
    if(!name)
        return res.status(400).json({message:"Name Is Require"})
    
    const product=await productmodel.findOne({name}).populate("category", "name");
   if(!product)
    return res.status(404).json({message: "Not Found Product Has This Name"})
   res.status(200).json({
    message:"The Fetching is done",
    data: product
   })

 }catch(error)
 {
   res.status(500).json({message: "Server Error",error : error.message})
 }

}



//get page product  
const getproductbyid= async(req,res)=>
{
    try
    {
        const {productid}= req.params;
        if(!productid)
         return res.status(400).json({message :"Item Id Required"})
        const product= await productmodel.findById(productid).populate("category")
        if(!product)
            return res.status(404).json({message: "The Product Not Availabel"})
        res.status(200).json({
            message: "The product based of id is :",
            data: product
        }) 
    }catch(error)
    {
       res.status(500).json({message: "Server Error",error: error.message})
    }

}


module.exports=
{
 getallProduct,
 getCategoryProduct,
 createNewProduct,
 updateproduct,
 hideproduct,
 getfiltersnameproduct,
 getproductbyid,

}