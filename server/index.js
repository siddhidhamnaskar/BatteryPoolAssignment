const express=require("express");
const connection=require("./Config/db");
const cors=require('cors');
const app=express();
const bodyparser = require('body-parser');
const jwt=require("jsonwebtoken");
const UserRouter=require("./Controllers&Routes/user");
const TaskRouter=require("./Controllers&Routes/task");



const dotenv=require("dotenv");
dotenv.config();
const PORT=process.env.PORT || 8000;



app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json());

app.use("/",UserRouter);
app.use("/tasks",TaskRouter);

app.listen(PORT,()=>{
    try{
    connection();
     console.log(`Server is running on ${PORT}`);

    }
    catch(err){
        console.log("Error");
    }
});