const { default: mongoose } = require("mongoose");
const ProductSchema= new mongoose.Schema
({ 
     name : {type: String , required: true, unique:true},
     image :{type : String},
    price: { type: Number },
    sizes: [{
        size:{type: String,enum:["Small","Medium","Large"]},
        price: { type: Number }
    }] ,
     isAvailable:{type: Boolean,default:true},
    description: { type: String },   
    category: {type: mongoose.Schema.Types.ObjectId,ref: "Category"}
},
{
    timestamps : true    
}
)
module.exports =mongoose.model("Product",ProductSchema);
                                                                 