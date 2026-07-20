import { NextFunction,Request,Response } from "express";
import { GetallDoctorsRequestUseCase } from "../../../application/useCases/admin/getAllDoctorsRequests.usecase.js";
import { HttpStatus } from "../../../shared/constanst/httpStatus.js";
import { GetDoctorRequestByIdUseCase } from "../../../application/useCases/admin/getDoctorRequestById.usecase.js";
import { ApproveDoctorRequestUseCase } from "../../../application/useCases/doctor/approveDoctorRequest.usecase.js";


 export class AdminDoctorController{
    constructor(private getAllDcotorRequestUseCase:GetallDoctorsRequestUseCase,
        private getDoctorRequestByIdUseCase : GetDoctorRequestByIdUseCase,
        private approveDoctorRequestUseCase : ApproveDoctorRequestUseCase
    ){}

    async getAllDcotorRequest(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const page = Number(req.query.page)||1;
            const limit = Number(req.query.limit)||10;
            const search = req.query.search as string | undefined;
            const status = req.query.status as string | undefined;
            const result = await this.getAllDcotorRequestUseCase.execute(page,limit,search,status)
            res.status(HttpStatus.OK).json({success:true,message : "Doctor requested fetched successfully",data : result})
        }
        catch(error:any){
            next(error)
        }
    }
    async getDoctorRequestById(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const id = req.params.id as string;
        const doctor = await this. getDoctorRequestByIdUseCase.execute(id)
        res.status(HttpStatus.OK).json({success:true,message:"Doctor request fetched succesfully",data:doctor})
        }
        catch(error:any){
            next(error)
        }
    }
    async approveDoctorRequest(req:Request,res:Response,next:NextFunction){
        try{
            const id = req.params.id as string;
            const {departmentId} = req.body;
            await this.approveDoctorRequestUseCase.execute(id,departmentId)
            res.status(HttpStatus.OK).json({success:true,message:"Doctor approved successfully"})
        }
        catch(error:any){
            next(error)
        }
    }
}