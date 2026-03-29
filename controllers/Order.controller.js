const { json } = require("express");
const ordermodel = require("../models/OrdersSchema");
const productmodel = require("../models/ProductSchema")
 const usermodel= require("../models/UserSchema")
//create order
const createorder = async (req, res) => {
  try {
    const { products, tableNumber } = req.body;

    // ✅ validation
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Products are required",
      });
    }

    // ✅ loop on products
    for (let item of products) {
      const { product, quantity } = item;

      if (!product || !quantity || quantity <= 0) {
        return res.status(400).json({
          message: "Invalid product or quantity",
        });
      }

      const foundProduct = await productmodel.findById(product);

      if (!foundProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
         let totalAmount=0;
      // ✅ حساب السعر
      totalAmount += foundProduct.price * quantity;
    }

    // ✅ create order
    const neworder = await ordermodel.create({
      user: req.user.id,
      products,
      tableNumber,
      totalAmount,

    });

    res.status(201).json({
      message: "Order created successfully",
      data: neworder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      err: error.message,
    });
  }
};
//get pre orders the user
const listorder= async(req,res)=>
{ 
    try
    {   
        const preorders= await ordermodel.find({user: req.user.id,});
        res.status(200).json({
            message: "Return All Products Was Successfully ",
            data: preproducts
        }) 

    }catch(error)
{
    return res.status(500).json({
        message: "Server error",
        err: error.message
    })}
}
//get all orders
const getAllOrders= async(req,res)=>
{ 
    try
    {  
        const preorders= await ordermodel.find();
        res.status(200).json({
            message: "Return All Products Was Successfully ",
            data: preorders
        }) 

    }catch(error)
{
    return res.status(500).json({
        message: "Server error",
        err: error.message
    })}
}
// update order
const updateorder=async(req,res)=>
{
    const{orderId}=req.params;
    if(!orderId)
        return res.status(400).json({message: "The Product ID IS Require"})
    const{name,products,tableNumber}=req.body;
    const updateorder= await ordermodel.findOneAndUpdate(
        {_id: orderId},
        {name,products,tableNumber},
        {new : true}
    )
    if(!updateorder)
        return res.status(404).json({message:"The Update Not Done"})
    res.status(200).json({message:"The New Order is : ",data: updateorder})
}
//hide orders
const hidecategory= async(req,res)=>
{
   try
      {
        const {orderid} = req.params;  
         if(!orderid)
          return res.status(400).json({message:"The ID is Required"})
        await ordermodel.findByIdAndUpdate(
         orderid,
          {isCompleted : false},
           { new: true }
        )
        res.status(200).json({message:"The Order is Hide Sucessfully"})
  
      }catch(err){
          res.status(500).json({
              message:"Server Error",
              err: err.message
          })
      }
     
}
module.exports=
{
  createorder,
  getAllOrders,
  updateorder,
  hidecategory,
listorder,
}