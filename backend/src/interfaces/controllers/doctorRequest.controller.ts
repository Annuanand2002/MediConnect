import { NextFunction } from "express";
import { RegisterDoctorRequestUseCase } from "../../application/useCases/doctor/registerDoctorRequest.js";
import { DoctorRequest } from "../../domain/entities/doctorrequest.entity.js";
import { HttpStatus } from "../../shared/constanst/httpStatus.js";
import { Request, Response } from "express";
import { CloudinaryServices } from "../../infrastructure/services/cloudinary/cloudinary.services.js";




export class DoctorRequestcontroller {
    constructor(private registerDoctorRequestUsecase : RegisterDoctorRequestUseCase,private cloudinaryService:CloudinaryServices){}

    async register(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const files = req.files as {
                governmentId?: Express.Multer.File[];
                degreeCertificates?: Express.Multer.File[];
                medicalLicense?: Express.Multer.File[];
            }
            
            if(!files.governmentId||!files.degreeCertificates||!files.medicalLicense){
                throw new Error("All required documents must be uploaded")
            }

            const governmentIdUpload = await this.cloudinaryService.uploadPDF(files.governmentId[0].buffer);
            const degreeCertificatesUploads = await Promise.all(files.degreeCertificates.map(file=>this.cloudinaryService.uploadPDF(file.buffer)))
            const medicalLicenseUpload = await this.cloudinaryService.uploadPDF(files.medicalLicense[0].buffer)

            const {fullName,email,phone,dateOfBirth,specialization,qualification,experience,governmentIdNumber,} = req.body;
            const doctorRequest = new DoctorRequest(fullName,email,phone,new Date(dateOfBirth),specialization,qualification,Number(experience),governmentIdNumber,governmentIdUpload.secure_url,degreeCertificatesUploads.map(file=>file.secure_url),medicalLicenseUpload.secure_url);
            const result = await this.registerDoctorRequestUsecase.execute(doctorRequest)
            res.status(HttpStatus.CREATED).json({success:true,message:"Your application has been submitted succesfully. Por team will review your application within 2-3 business days."})

        }catch(error:any){
            next(error)
        }
    }
}