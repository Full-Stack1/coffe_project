const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/final_project").then(()=>{
    console.log("Ready To Use Data base")
}).catch((err)=>
{
    console.log(err);
})
