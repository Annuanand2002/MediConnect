import { AdminLogin } from "../../application/useCases/admin/admin.login.js";   
import { Request, Response } from "express";
import { NextFunction } from "express";

export class AdminController{
   constructor(private adminLogin: AdminLogin){}

    async login(req:Request,res:Response, next:NextFunction):Promise<void>{
        try{
            const {email,password} = req.body;

            const result = await this.adminLogin.execute(email,password);
            res.cookie("refreshToken",result.refreshToken,{
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge:7*24*60*60*1000
            }).status(200).json({success:true,message:"Login successful",accessToken:result.accessToken,admin:result.admin});
        }catch(error:any){
            next(error);
        }
    }
}