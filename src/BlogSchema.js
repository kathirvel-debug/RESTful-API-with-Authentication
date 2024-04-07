import mongoose from "mongoose";

export const BlogSchemas = new mongoose.Schema({
    blog: String,
    categories:String,
    author:String,
    authorID: mongoose.Schema.Types.ObjectId,
    Comment:[{user:String,content:String}]

})