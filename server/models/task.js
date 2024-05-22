const mongoose=require("mongoose");

const {Schema}=require("mongoose");

const taskSchema=new Schema({
    Title:{type:"String",required:true },
    Desc:{type:"String",required:true},
    DueDate: { type: Date, required: true },  
    Status: { 
        type: String, 
        required: true,
        enum: ['Pending', 'In Progress', 'Completed'],  
        default: 'Pending'  // Default value
    },
    Image:{type:"String",required:true},
    Author:{type:Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true
})

const TaskModel=mongoose.model("Task",taskSchema)
module.exports=TaskModel;

