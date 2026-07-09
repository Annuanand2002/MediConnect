import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose"
import connectDB from "../config/db.js";
import {AdminModel} from "../infrastructure/database/models/admin.model.js";

dotenv.config();
const seedAdmin = async()=>{
    try{
        await connectDB();
        const existingAdmin = await AdminModel.findOne({email:process.env.ADMIN_USERNAME,})
        if(existingAdmin){
            console.log("Admin already exists");
            process.exit(0);
        }
        if(!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD){
            throw new Error("Admin username or password is not defined in environment variables");
        }
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD,10);
        await AdminModel.create({
            email:process.env.ADMIN_USERNAME,
            password:hashedPassword
        });
        console.log("Admin created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};
seedAdmin();