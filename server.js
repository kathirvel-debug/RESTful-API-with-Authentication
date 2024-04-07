import express from 'express'
import router  from './src/router.js';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';


import connectUsingMongoose from './config/mongoos.js';
import cors from'cors'
const server=express();
server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded())
server.use(cors());
server.use('/api',router);
server.listen(8005,()=>{
    console.log("server is running");
    connectUsingMongoose()
})