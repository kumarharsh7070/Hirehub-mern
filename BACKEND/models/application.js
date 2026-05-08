import mongoose from "mongoose"


const ApplicationSchema =  new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },

     job:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"Job",
           required:true,

     },
     status:{
        enum:["applied", "rejected", "accepted"],
        default: "applied",
        type:String,
        required:true
     }
},{timestamps:true,
    versionKey:false})

 export const Application = mongoose.model("Application", ApplicationSchema)