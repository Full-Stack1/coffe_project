const { default: mongoose } = require("mongoose");
const itemschema= new mongoose.Schema
({ 
     name : {type: String , required: true , unique : true},
     image :{type : String},
     price: { type: Number, required: true },
     quantity: {type: Number},
     isDeleted:{type: Boolean,default:false},
    description: { type: String },   
    category: {type: mongoose.Schema.Types.ObjectId,ref: "Category"}
},
{
    timestamps : true    
}
)
module.exports =mongoose.model("Item",itemschema);                                                                    