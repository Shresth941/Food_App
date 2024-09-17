import mongoose from "mongoose";



export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://1rn20ec087shresthsingh:Shresth123@cluster0.0a33t.mongodb.net/Food_App').then(()=>console.log('Connected to the database'))
}