const { default: mongoose } = require("mongoose");
const CategorySchema =new mongoose.Schema
({
name:{type : String,required: true, unique:true},
image: { type: String },
 isActive: { type: Boolean, default: true },
 //itemsCount: { type: Number, default: 0 },
},
{
     timestamps : true  
}
)
module.exports=mongoose.model("Category",CategorySchema);
