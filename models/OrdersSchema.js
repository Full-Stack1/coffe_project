const { Mongoose, default: mongoose } = require("mongoose");
const OrderSchma= new mongoose.Schema({
name: {type:String,required: true},
user:{ type: mongoose.Schema.Type.ObjectId,ref:"User"},
items:[{type: mongoose.Schema.Type.ObjectId,ref: "Item"}],
numberOrder: {type: Number,unique:true},
tableNumber: { type: Number }, 
status:{type: String,enum:["pending", "ready", "completed", "cancelled"],default: "pending"},
 totalAmount: { type: Number, required: true },
quantity: { type: Number, default: 1 },
timeOrder:{type : Date},
},
{
    timestamps : true    
})
module.exports=mongoose.module("Orders",OrderSchma);