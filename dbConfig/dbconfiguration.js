import mongoose from "mongoose";

export const connectionUsingMongoose=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('connected to mongodb atlas successfully..');

    }
    catch(error){
        console.log("There is an error while connecting to mongodb database");

    }
}