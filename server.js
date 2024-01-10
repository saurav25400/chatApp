import express from "express";
import http from 'http';
import path from 'path';
import { Server } from "socket.io";
import './configdotenv.js'
import { connectionUsingMongoose } from "./dbConfig/dbconfiguration.js";
import { messageSchema } from "./src/message.chema.js";
import mongoose from "mongoose";

const chatModel=mongoose.model('Chats',messageSchema);

const app=express();

app.get("/",(req,res)=>{
    return res.sendFile(path.resolve('clients', 'html', 'client.html'));
    
})


const httpServer=http.createServer(app);

const io=new Server(httpServer,{
    cors:{
        origin:"*",
        methods: ["GET", "POST"]
    }
})
var countUsers=0;
io.on("connection",(socket)=>{
    countUsers+=1;
    console.log(socket.id);
    socket.broadcast.emit("countTotalUsers",countUsers++);
    socket.on("send_message",async(data)=>{
        const newChat=new chatModel({
            username:data.username,
            message:data.message
        })
        
        await newChat.save();

    })
   
    socket.on("join",(data)=>{

       
       socket.broadcast.emit("info_user",data.username);
        socket.broadcast.emit("user-message",data);
         //as soon as user joins ..load the previous messages from database
         chatModel.find().sort({timestamp:1}).limit(50).then((doc)=>{
            socket.emit("load_messages",doc)
        }).catch((error)=>{
            console.log(error);
        })
        
    });

    socket.on("end_welcome_message",(username)=>{

        socket.broadcast.emit("welcome_message",data.username);
    })
    

    //broadcast welcomw mwssage
    socket.on("send_username",(username)=>{
        socket.broadcast.emit("get_username",username);
    })













    socket.on("disconnect",()=>{
        console.log("connection is established..");
        // socket.broadcast.emit("countMinusUsers",countUsers--);
        countUsers-=1;
        console.log('client has disconnected from socket server.');
    })
})

httpServer.listen(5000,()=>{
    console.log("server is connected at port 5000");
    connectionUsingMongoose();
    
})
export default httpServer;