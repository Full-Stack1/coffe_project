const express = require("express");
require("dotenv").config();
const usersRouter = require("./routes/user");
const itemsRouters = require("./routes/items");
const categoryRoutes= require("./routes/category");
require("./models/db");
const app = express();
app.use(express.static("public")); 
app.use(express.json());    //تحويل ال obj  الي json
/*   مشان اتأكد انو باك عندي بشتغل 
app.get("/health",(req,res)=>{ 
    res.send("OK");
})*/
//console.log(process.env.test);
app.use("/users",usersRouter);
app.use("/items",itemsRouters);
app.use("/category",categoryRoutes);





app.listen(process.env.PORT, () => {
console.log(`Server running at http://localhost:${process.env.PORT}`);
});