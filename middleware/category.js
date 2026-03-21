
const usermodel=require ("../models/UserSchema");
const validate_addnew_category = (req,res,next)=>
{
   const{name,image}=req.body;
    if(!name)
        return res.status(400).json({message: "Pleas Enter Your Name"})
       else  if(!image)
        return res.status(400).json({message: "Pleas Enter Image URL "})
     
      next();
      

}
const validateupdatecategory= (req,res,next)=>
{
    const{name,image,isActive}=req.body;
    if(!name)
        return res.status(400).json({message: "Pleas Enter Your Name"})
       else  if(!image)
        return res.status(400).json({message: "Pleas Enter Image URL "})
     else if(typeof isActive !== "boolean")
        return res.status(400).json({message: "Pleas Enter Status Of Category "})
     
      next();
}
module.exports= 
{

    validate_addnew_category,
    validateupdatecategory,

}