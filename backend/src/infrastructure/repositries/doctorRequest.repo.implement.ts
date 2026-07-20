import { DoctorRequest } from "../../domain/entities/doctorrequest.entity.js";
import { IDoctorRequestRepository } from "../../domain/repositories/doctorRequest.repository.js";
import doctorRequestModel from "../database/models/doctorRequest.model.js";






export class DoctorRequestRepository implements IDoctorRequestRepository{
    async create(request: DoctorRequest):Promise<DoctorRequest>{
        const doctorRequest = await doctorRequestModel.create(request);
        return doctorRequest.toObject() as DoctorRequest;
    }

    async findByEmail(email:string):Promise<DoctorRequest|null>{
        return await doctorRequestModel.findOne({email})
    }
    async findById(id:string):Promise<DoctorRequest|null>{
        return await doctorRequestModel.findById(id)
    }
    async update(id:string,data:Partial<DoctorRequest>):Promise<DoctorRequest|null>{
        return await doctorRequestModel.findByIdAndUpdate(id,data,{new:true})
    }
    async findPending(): Promise<DoctorRequest[]> {
        return await doctorRequestModel.find({status:"PENDING"})
    }
    async findAll(page:number,limit:number,search?:string,status?:string):Promise<DoctorRequest[]>{
        const query : any = {};
        if(search){
            query.$or = [
                {
                    fullName : {$regex:search,$options : "i"}
                },
                {
                    email: {$regex : search,$options : "i"}
                }
            ]
        }
        if(status){
            query.status = status;
        }
        return (await doctorRequestModel.find(query).sort({createdAt:-1}).skip((page-1)*limit).limit(limit).lean()) as DoctorRequest[]
    }
    async count(search?:string,status?:string):Promise<number>{
        const query : any = {};
        if(search){
            query.$or = [
            {
                fullName : {$regex : search ,$options:"i"}
            },
            {
                email : {$regex : search,$options : "i"}
            }
            ]
        }
        if(status){
            query.status = status;
        }
        return await doctorRequestModel.countDocuments(query);
    }
}