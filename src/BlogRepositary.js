import mongoose from "mongoose";
import { BlogSchemas } from "./BlogSchema.js";
const model = mongoose.model('Blog', BlogSchemas);
export default class blogRepositary {
    async addBlog(data) {
        try {
            const blog = new model(data)
            await blog.save();
            return blog
        } catch (err) {
            console.log(err);
        }
    }
async getallblog(){
    try{
        const data= await model.find();
        return data

    }
    catch(err){
        console.log(err);
    }
}
async getByid(id){
    try{
        const data= await model.findOne({_id:id});
        return data

    }
    catch(err){
        console.log(err);
    }
}
async categories(types){
    let filterExpression={};
   
    try{
      const query=  types ? { categories: { $in: types } } : {};
        const data= await model.find(query)
        
        return data
    }
    catch(err){
console.log(err);
    }
}
    async updateDB(blogid,authorid,updateblog,updatecategories) {
        try {
            const blog = await model.findOne({ _id: blogid, authorID: authorid })
            if(!blog){
                return false
            }
            else{
                blog.blog=updateblog;
                blog.categories=updatecategories
                await blog.save();
                return true
            }
           
        }
        catch (err) {
            console.log(err);
            
        }
    }
    async comments(id,cmt){
        try {
            const blog = await model.findOne({ _id: id })
            if(!blog){
                return false
            }
            else{
                blog.Comment.push(cmt)
                await blog.save();
                return blog
            }
           
        }
        catch (err) {
            console.log(err);
            
        }
    }
    async delete(id,userid){
        try{
            const result= await model.deleteOne({_id:id , authorID:userid})
            if (result.deletedCount === 1){
                return true
            }
            else{
                return false
            }

        }catch(err){
            console.log(err);
        }
    }
}