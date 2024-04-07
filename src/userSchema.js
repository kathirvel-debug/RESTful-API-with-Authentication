import mongoose from "mongoose";

export const userSchemas = new mongoose.Schema({
    name: String,
    password: String,
})