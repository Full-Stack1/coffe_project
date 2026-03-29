const { Mongoose, default: mongoose } = require("mongoose");
const OrderSchma= new mongoose.Schema({
name: {type:String,required: true},
user:{ type: mongoose.Schema.Types.ObjectId,ref:"User"},
products:[{product: {type: mongoose.Schema.Types.ObjectId,ref: "Product"},
 quantity: { type: Number, default: 1}}],
numberOrder: {type: Number,unique:true, default : 1},
tableNumber: { type: Number }, 
status:{type: String,enum:["pending", "ready", "completed", "cancelled"],default: "pending"},
 totalAmount: { type: Number, required: true },
 isCompleted: { type: Boolean,default: true},
},
{
    timestamps : true    
})
module.exports=mongoose.model("Orders",OrderSchma);
