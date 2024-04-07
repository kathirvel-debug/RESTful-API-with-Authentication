import blogRepositary from "./BlogRepositary.js";
import BlogModel from "./BlogModel.js";
const blogRepo= new blogRepositary()
export default class blogController{
async blogpost(req,res){
    const{blog,categories}=req.body
    const author = req.name.userName;
    const authorID = req.user.userID;
console.log(req.body);
    if (blog===''||author===""||categories===""||authorID===""){
       return res.status(200).send("Please enter all Required field")
    }
    try{
        const data= new BlogModel(blog,author,categories,authorID)
        const datas = await blogRepo.addBlog(data)
        return res.status(201).send(datas)
    }
    catch(err){
return  res.status(500).send('Internal Server Error');
    }

}

async getpost(req,res){
    try{
const data= await blogRepo.getallblog();
res.status(200).send({Blogs:data})
    }
    catch(err){
        console.log(err);
        return  res.status(500).send('Internal Server Error');
    }
}
async getpostid(req,res){
    try{
        const{id}=req.params
        if (id===''){
            return res.status(200).send("Please enter all Required field")
         }
         const data=await blogRepo.getByid(id)
         res.status(200).send({Blogs:data})
    }
    catch(err){
        res.status(500).send('Internal Server Error');
    }
}
async filter(req,res){
    const{type}=req.body
    console.log(req.body);
    console.log(type);
    if (type===""){
        return res.status(200).send("Please enter all Required field")
     }
    try{
       const data= await blogRepo.categories(type);
       res.status(200).send({Blogs:data})
    } catch(err){
        res.status(500).send('Internal Server Error');
    }
}
async update(req,res){
const{id}=req.params
const{blog,categories}=req.body
const userId = req.user.userID;
if (id===''||blog===""||categories===""){
    return res.status(200).send("Please enter all Required field")
 }
try {
   const data= await blogRepo.updateDB(id,userId,blog,categories)
   if(data){
   return res.status(200).send('Blog updated successfully');
   }
   else{
  return  res.status(401).send('Invalid user or Blogid');
   }
    
} catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
}
}

async comment(req,res){
    const{id}=req.params
    const username=req.name.userName
    const{content}=req.body
    const cmt={
        user:username,
        content,

    }
    if (id===''||content===''){
        return res.status(200).send("Please enter all Required field")
     }
     try{
        const result=await blogRepo.comments(id,cmt)
        if(result){
          return  res.status(200).send({Comment:result});
        }
        else{
           return res.status(401).send('Invalid user or Blogid');
        }

    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

}

async delete(req,res){
    const{id}=req.params
    const userID=req.user.userID
    if (id===''){
        return res.status(200).send("Please enter all Required field")
     }
    try{
        const result=await blogRepo.delete(id,userID)
        if(result){
          return  res.status(200).send('Blog Deleted successfully');
        }
        else{
           return res.status(401).send('Invalid user or Blogid');
        }

    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}
}