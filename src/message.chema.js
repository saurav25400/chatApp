import mongoose from "mongoose";

export const messageSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }

})