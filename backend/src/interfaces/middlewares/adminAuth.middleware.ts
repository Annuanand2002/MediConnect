import {Request,Response, NextFunction } from "express";
import { IAdminRepositories } from "../../domain/repositories/IAdminRepositories.js";
import { JwtService } from "../../infrastructure/services/jwt.services.js";
import { APIError } from "../../shared/errors/apiError.js";
import { HttpStatus } from "../../shared/constanst/httpStatus.js";



export class AdminAuthMiddleware{
    constructor(private adminRepository:IAdminRepositories,
        private jwtServices:JwtService
    ){}
    async authenticate(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            console.log(req.headers.authorization)
            const authHedaer = req.headers.authorization;
            if(!authHedaer||!authHedaer.startsWith("Bearer")){
                throw new APIError(HttpStatus.UNAUTHORIZED,"Access token is required")
            }
            const token = authHedaer.split(' ')[1];
            console.log("token",token)
            const payload = this.jwtServices.verifyAccessToken(token) as {adminId:string;email:string};
            console.log("paylaod",payload)
            const admin = await this.adminRepository.findById(payload.adminId);
            if(!admin){
                throw new APIError(HttpStatus.UNAUTHORIZED,"admin not found")
            }
            req.admin = admin;
            next()
        }catch(error){
            next(error)
        }
    }
}