const categorymodel=require("../models/CategorySchema");
//get all category
const getallcategory= async (req,res)=>
{  
    try
   { 
    const Category= await categorymodel.find({isActive : true});
    res.status(201).json
    ({
            message: "The Category is : ",
            data: Category
     }) 
    }catch(err)
    {
        res.status(500).json({message:"Server Error",err:err.message});
    }
   }
//add new catigoray by admin 
const addnewcategory = async (req,res)=>
{
    try
    {
      const{name,image}=req.body;
      const existcategory= await categorymodel.findOne({name});
     if(existcategory)
        return res.status(400).json({message: "The Category  Alrady Was Added "})
      const addcategory= await categorymodel.create({name,image});
      if(!addcategory)
        return res.status(404).json({message:" The Category not added "});
     
       res.status(201).json
       ({
        message:" Was Added Category is Successfully",
        data:addcategory
     })

    }catch(err)
    {
      res.status(500).json({message: "Server Error",err:err.message})
    }
}

//update category by admin 
const updatecategorybyid = async(req,res)=>
{
   try
   {
    const {name,image,isActive}=req.body;
    const{Categoryid}=req.params;
    if(!Categoryid)
        return res.status(404).json({message:"Enter User ID"});
    const updatecategory= await categorymodel.findByIdAndUpdate
    (
       Categoryid ,
       {name,image,isActive},
       {new : true}
    )
    if(!updatecategory)
   return res.status(404).json({message:"Category not found"});
    res.status(201).json
    ({
        message:"The Update Category is Successfully ",
        data: updatecategory 
    })
}catch(err)
{ 
     res.status(500).json({message:"Server Error ",err: err.message}) 
    
}
}
//hide category by admin 
const hidecategory= async(req,res)=>
{
   try
      {
        const Categoryid = req.params.Categoryid;  
         if(!Categoryid)
          return res.status(400).json({message:"The ID is Required"})
        await categorymodel.findByIdAndUpdate(
         Categoryid,
          {isActive : false},
           { new: true }
        )
        res.status(200).json({message:"The Category is Hide Sucessfully"})
  
      }catch(err){
          res.status(500).json({
              message:"Server Error"
          })
      }
     
}

module.exports=
{
    getallcategory,
    addnewcategory,
    updatecategorybyid,
     hidecategory,
}

