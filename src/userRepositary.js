import mongoose from "mongoose";
import { userSchemas } from "./userSchema.js";
import { log } from "console";
const UserModels = mongoose.model('Blog_user',userSchemas);
export default class userRepositary{
    async signUp(newUser) {
        try{
          const newuser=new UserModels(newUser);
          await newuser.save();
          return newuser;
        } catch(err){
          console.log(err);
          
        }
      }
      async signIN(name){
        try{
            const user= await UserModels.findOne({name})
            return user
        }
        catch(err){
            log('Error in username:', err);
        }
      }
}