
const express=require("express");
const User=require("../models/user");
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

router.post("/signup",upload.single('file'),async(req,res)=>{
    try{
        const file=req.file;
        const {path}=file;
        const res=await cloudinary.uploader.upload(path);
        console.log(res);
        const combinedPassword = req.body.Password+ secret;
        const salt=await bcrypt.genSalt(8);
        const hashPass=await bcrypt.hash(combinedPassword,salt);
        // const newUser=new User({
        //   Name:req.body.Name,
        //   Email:req.body.Email,
        //   Password:hashPass,
        //   Profile:req.secure_url
          
  
            
        // });
        // const user= await newUser.save();
        // console.log(user);
        res.status(200).json(user);
  
     }
     catch(err){
      res.status(500).json(err);
        
     }
  
   
})

router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({Email:req.body.Email});
    
        !user && res.status(400).json("Wrong Credintials");
    
        const validate=await bcrypt.compare(req.body.Password,user.Password);

       if(validate)
       {
        jwt.sign({Name:user.Name,Email:user.Email,id:user._id},secret,{ expiresIn: "1h" },(err,token)=>{
            if(err) throw err;
           
            
            res.cookie('token',token).json(token)
        
        })
       }
       else{
         res.status(400).json("Incorrect Password");
       }

      
    
  
      }
      catch(err)
      {
        res.status(500).json(err);
   
      }
})

module.exports=router;