const { default: mongoose } = require("mongoose");

const userschema = new mongoose.Schema
({
   Name: {type : String,required : true},
   Email: {type : String,required : true ,unique:true},
   PassWord:{type : String,required : true },
    phone: { type: String },
   role: {
      type : String,
      enum:["customer", "admin", "cashier"],
      default: "customer"} 
},
{
    timestamps : true    
}
)
module.exports=mongoose.model("User",userschema);