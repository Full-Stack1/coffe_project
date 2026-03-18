const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.URL_DB).then(()=>{
    console.log("Ready To Use Data base")
}).catch((err)=>
{
    console.log(err);
})
