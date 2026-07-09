import {NextFunction, Request, Response} from "express";
import {APIError} from "../../shared/errors/apiError.js";
import {HttpStatus} from "../../shared/constanst/httpStatus.js";

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction):void=>{
    if(err instanceof APIError){
        res.status(err.statusCode).json({success:false,message:err.message});
        return;
    }
    console.error(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:"Internal Server Error"});
}