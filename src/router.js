import express from "express";
import userController from "./userController.js";
import blogController from "./BlogController.js";
import jwtAuth from '../Middelware/JwtMiddelware.js'

const newuserController= new userController()
const blog= new blogController()
const router = express.Router();
router.post('/register',(req,res)=>{
    newuserController.signUp(req,res)
})
router.post('/login',(req,res)=>{
    newuserController.sigIn(req,res)
})
router.get('/posts',(req,res)=>{
    blog.getpost(req,res)
})
router.get('/posts/:id',(req,res)=>{
    blog.getpostid(req,res)
})
router.get('/types',(req,res)=>{
    blog.filter(req,res)
})
router.post('/posts',jwtAuth,(req, res) => {
    blog.blogpost(req,res)
    })
router.put('/posts/:id',jwtAuth,(req,res)=>{
    blog.update(req,res)
})
router.put('/comment/:id',jwtAuth,(req,res)=>{
    blog.comment(req,res)
})
router.delete('/posts/:id',jwtAuth,(req,res)=>{
    blog.delete(req,res)
} )

 export  default router