import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoutes from "./route.js";

dotenv.config();
const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI as string,{
            dbName:"SpotifyClone"
        });
        console.log('MongoDB Connected');
        
    } catch (error) {
        console.log(error);
    }
}
const app = express();
app.use(express.json());
app.use("/api/v1",userRoutes);
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    connectDB();
})