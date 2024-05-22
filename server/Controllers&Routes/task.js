const express=require("express");
const Tasks=require("../models/task");
const bcrypt=require("bcryptjs");
const cloudinary=require("cloudinary");
const multer=require('multer');
const router=express.Router();
const secret=process.env.SECRET;

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET

})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create" ,upload.single('file'),async(req,res)=>{

    try{
     
      
        const file=req.file;
        const {path}=file;
        const res=await cloudinary.uploader.upload(path);
        console.log(res);
        fs.unlinkSync(path);
       
         const blog=new Tasks({
            Title:req.body.title,
            Desc:req.body.desc,
            DueDate:req.body.dueDate,
            Image:res.secure_url,
            Content:req.body.content,
            Author:req.body.id
          })
          const post=await blog.save();
          res.status(200).json(post);
  
    
     
     
    }
    catch(err){
      res.status(505).json(err);
    }
    }
   
  
  )

router.get("/",async(req,res)=>{
    try{
      console.log("function called")
      const taskData=await Tasks.find();
      // const taskData=await Tasks.find().populate('Author',['Name']).sort({createdAt:-1}).limit(20);
      res.status(200).json(taskData);
  
    }
    catch(err){
      res.status(505).json(err);
    }
   
  
  })

  module.exports=router;