import { Request,Response,NextFunction } from "express";
import { CreatePasswordUseCase } from "../../application/useCases/doctor/createPasswordUseCase.js";
import { HttpStatus } from "../../shared/constanst/httpStatus.js";
import { LoginDoctorUseCase } from "../../application/useCases/doctor/loginDoctorUseCase.js";



export class DoctorController{
    constructor(private createPasswordUsecase:CreatePasswordUseCase,private loginDoctorUseCase:LoginDoctorUseCase){}
    async createPassword(req:Request,res:Response,next:NextFunction){
        try{
            const {token,password} = req.body;
            await this.createPasswordUsecase.execute(token,password);
            res.status(HttpStatus.OK).json({success:true,message:"Password created succesfully.You can now login"})
        }
        catch(error:any){
            next(error)
        }
    }
    async login(req:Request,res:Response,next:NextFunction){
        try{
            const{email,password} = req.body;
            const result = await this.loginDoctorUseCase.execute(email,password)
            res.status(HttpStatus.OK).json({success:true,message:"Login successfull"})
        }catch(error:any){
            next(error)
        }
    }
}