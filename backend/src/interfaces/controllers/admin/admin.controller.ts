import { AdminLogin } from "../../../application/useCases/admin/admin.login.js";   
import { Request, Response } from "express";
import { NextFunction } from "express";
import { AdminRefreshTokenUseCase } from "../../../application/useCases/admin/admin.refreshToken.js";
import { AdminLogoutUseCase } from "../../../application/useCases/admin/admin.logout.js";
import { HttpStatus } from "../../../shared/constanst/httpStatus.js";


export class AdminController{
   constructor(private adminLogin: AdminLogin, private adminRefreshToken: AdminRefreshTokenUseCase, private adminLogout: AdminLogoutUseCase){}

    async login(req:Request,res:Response, next:NextFunction):Promise<void>{
        try{
            const {email,password} = req.body;

            const result = await this.adminLogin.execute(email,password);
            res.cookie("refreshToken",result.refreshToken,{
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge:7*24*60*60*1000
            }).status(HttpStatus.OK).json({success:true,message:"Login successful",accessToken:result.accessToken,admin:result.admin});
        }catch(error:any){
            next(error);
        }
    }
    async refreshToken(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
           const refreshToken = req.cookies.refreshToken;
           const result = await this.adminRefreshToken.execute(refreshToken);
              res.status(HttpStatus.OK).json({success:true,message:"Token refreshed successfully",accessToken:result.newAccessToken});
        }
        catch(error:any){
            next(error);
        }
    }

    async logout(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
              const refreshToken = req.cookies.refreshToken;
                await this.adminLogout.execute(refreshToken);
                res.clearCookie("refreshToken",{httpOnly:true,secure:false,sameSite:"lax"}).status(200).json({success:true,message:"Logout successful"});
                res.status(HttpStatus.OK).json({success:true,message:"Logout successful"});
        }
        catch(error:any){
            next(error);
        }
    }

        async me(req:Request,res:Response):Promise<void>{
            res.status(HttpStatus.OK).json({success:true,admin:req.admin})
    }
}