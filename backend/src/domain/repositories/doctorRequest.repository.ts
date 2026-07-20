import { DoctorRequest } from "../entities/doctorrequest.entity.js"


export interface IDoctorRequestRepository{
    create(request:DoctorRequest):Promise<DoctorRequest>;
    findByEmail(email:string):Promise<DoctorRequest|null>;
    findById(id:string):Promise<DoctorRequest|null>;
    update(id:string,data:Partial<DoctorRequest>):Promise<DoctorRequest|null>;
    findPending():Promise<DoctorRequest[]>
    findAll(page:number,limit:number,search?:string,status?:string):Promise<DoctorRequest[]>;
    count(search?:string,status?:string):Promise<number>
}