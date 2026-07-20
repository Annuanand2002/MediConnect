import multer,{FileFilterCallback} from "multer";
import { Request } from "express";


const storage = multer.memoryStorage();

const fileFilter = (req:Request,file:Express.Multer.File,cb:FileFilterCallback)=>{
    if(file.mimetype === "application/pdf"){
        cb(null,true)
    }else{
        cb(new Error("Only pdf files can be uploaded"))
    }
}

export const uploadDoctorDocuments = multer({storage,fileFilter,limits:{fileSize:5*1024*1024}})