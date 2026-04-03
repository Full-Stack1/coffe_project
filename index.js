const express = require("express");
require("dotenv").config();
const usersRouter = require("./routes/user");
const productsRouters = require("./routes/product");
const categoryRoutes= require("./routes/category");
const orderRoutes= require("./routes/order")
const cors=require("cors");  
require("./models/db");
const app = express();
app.use(express.static("public")); 
app.use(express.json());    //تحويل ال obj  الي json
/*   مشان اتأكد انو باك عندي بشتغل 
app.get("/health",(req,res)=>{ 
    res.send("OK");
})*/
//console.log(process.env.test);
app.use(cors({ origin: "http://localhost:3000"}  ))
app.use("/users",usersRouter);
app.use("/products",productsRouters);
app.use("/category",categoryRoutes);
app.use("/order",orderRoutes);

app.listen(process.env.PORT, () => {
console.log(`Server running at http://localhost:${process.env.PORT}`);
});