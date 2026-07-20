import {UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary.js";
import { Readable } from "stream";
import { rejects } from "assert";



export class CloudinaryServices{
    async uploadPDF(buffer :  Buffer):Promise<UploadApiResponse>{
        return new Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "doctor-documents",
                    resource_type : "raw"
                },
                (error,result)=>{
                    if(error)return reject(error);
                    resolve(result!);
                }
            );
            Readable.from(buffer).pipe(stream);
        })
    }
}