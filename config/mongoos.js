import mongoose from "mongoose";
const url = 'mongodb+srv://kathirvel8926:xNoFczkik6KYHFhr@shoopingcart.ghj7lsd.mongodb.net/?retryWrites=true&w=majority&appName=shoopingcart';

const connectUsingMongoose = async()=>{
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
      }
    
}

export default connectUsingMongoose
