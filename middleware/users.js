const validateFiledcreateuser=(req,res,next)=>
{   
     const { Name, Email, PassWord, phone,role } = req.body;
    if(!Name)
    return res.status(400).json({message: "Pleas Enter Your Name"})
   else  if(!Email)
    return res.status(400).json({message: "Pleas Enter Your Email "})
 else if(!PassWord)
    return res.status(400).json({message: "Pleas Enter Your Password "})
 else if(!phone)
    return res.status(400).json({message: "Pleas Enter Your phone"})
  else if(!role)
    return res.status(400).json({message: "Pleas Enter Your role"})
next();
}
const validateRegister=(req,res,next)=>
{  
    const { Name, Email, PassWord, phone} = req.body;
    if(!Name)
        return res.status(400).json({message: "Pleas Enter Your Name"})
       else  if(!Email)
        return res.status(400).json({message: "Pleas Enter Your Email "})
     else if(!PassWord)
        return res.status(400).json({message: "Pleas Enter Your Password "})
     else if(!phone)
        return res.status(400).json({message: "Pleas Enter Your phone"})
      next();
}
const validateLogIn=(req,res,next)=>
{
    const {Email,PassWord}=req.body;
     if(!Email)
    return res.status(400).json({message: "Pleas Enter Your Email "})
 else if(!PassWord)
    return res.status(400).json({message: "Pleas Enter Your Password "})
   next();

}
const Validateupdateprofile = (req,res,next)=>
{     const {Name,Email,phone}=req.body;

 if(!Name)
     return res.status(400).json({message: "Pleas Enter Your Name"})
    else  if(!Email)
     return res.status(400).json({message: "Pleas Enter Your Email "})
  else if(!phone)
     return res.status(400).json({message: "Pleas Enter Your phone"})
   next();
}
const validateinfoprofile= async (req,res,next)=>
{
   const{userId}= req.params;
      if(!userId)
        return res.status(400).json({message: "The user id must by Enter"});
      const userprofile= await usermodel.findById(userId);
          if(!userprofile)
              return res.status(400).json({message: "The User Not Found "});
            next();
}
module.exports=
{
    validateRegister,
    validateLogIn,
    Validateupdateprofile,
    validateinfoprofile,
    validateFiledcreateuser,
}