const usermodel=require ("../models/UserSchema");
//const Item= require("../models/itemSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//create token
const generatetoken=(usercreate)=>
{
 const payload ={
    id : usercreate._id,
    role : usercreate.role
 }
   return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "14w"}) 
}

//register
const register=async(req,res)=>
{ 
   try{
    const {Name,Email,PassWord,phone} = req.body;
    
//check if user is exist based on email 
 const existuser= await usermodel.findOne({Email})
 if(existuser)
    return res.status(404).json({message: "The user alrady register from this email "})
//hashing password
const salt= 10; 
const hashing = await bcrypt.hash(PassWord,salt);
console.log("hashing",hashing)
//create user 
const usercreate =  await usermodel.create({Name,Email,PassWord : hashing,phone})  //add await becuse the add is  take long time to created

if(!usercreate)
    return res.status(404).json({message: "user not created"})
//هون حطينا توكسن يلي عملنا مشان ينبعث مع اليوزر 
const token= generatetoken(usercreate)

res.status(201).json({
       message:"New User Was add" ,
       data: { id: usercreate._id, Name, Email, phone },       token: token
    })
}catch(err)
{
  res.status(500).json({message:"Server Error", err : err.message})
 
}
 
}
//log in user 
const Login= async (req,res)=>
{
    try
    {
    const {Email,PassWord}=req.body;
    const user= await usermodel.findOne({Email})
    if(!user)
        return res.status(404).json({message:"This  Email Not Have Account "})
    const ismatch= await bcrypt.compare(PassWord,user.PassWord);
    if(!ismatch)
        return res.status(401).json({message: "password not correct"})
    const token= generatetoken(user);
    res.status(200).json({
       message:"Login sucessfully" ,
       data: user,
       token: token
    })

    }catch(err)
    {
    res.status(500).json({message:"Server Error", err : err.message})

    }

}
//get info profile
const getinfoprofile = async (req,res)=>
{
   try
   { 
      const{userId}= req.params;
    const userprofile= await usermodel.findById(userId);
    res.status(200).json({message: "The Info Profile is : ",data : userprofile});

   }catch(error)
   {
      res.status(500).json({message: " Server Error",error:error})
   }

}


//update profile 
const updateprofile=async(req,res)=>
{
     try
    {

    const {Name,Email,phone}= req.body;
    const { userid } = req.params;
    if (!userid)
  return res.status(400).json({ message: "User ID must be provided" });
  const editepofile= await usermodel.findByIdAndUpdate 
  (
     {_id: userid},
     {Name,Email,phone},
     {new : true}
  )
  res.status(200).json({message: "The profile information is updated ",data:editepofile })
}catch(error)
     {
       return res.status(500).json({message: "Server Error ",error:error.message})
     }

}
const newuser = async (req, res) => {
  try {
    const { Name, Email, PassWord, phone, role } = req.body;

    // هاش لكلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashing = await bcrypt.hash(PassWord, salt);

    // إنشاء المستخدم مباشرة
    const newusers = await usermodel.create({
      Name,
      Email,
      PassWord: hashing,
      phone,
      role
    });
    res.status(201).json({
      message: "New User was added",
      data: newusers,
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed: Another user has same Email or server error",
      err: err.message
    });
  }
};





/*
//usermodel.findone({name})   //هي لما ابحث عن حقل معين بستخدمها 
const getAllusers= (req,res)=>
{   //populate("items") to view the detail the item user
   usermodel.find({}).populate("items").then((result)=>  //مشان لا تصير مشاكل حطيت داخل ال find {}
{
    res.status(200)
    res.json(result)
}).catch((err)=>{
    res.send(err)
})
}
//create new user 
c


*/

module.exports= 
{
   register,
   Login,
   getinfoprofile,
   updateprofile,
   newuser,

}