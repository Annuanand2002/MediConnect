import { Doctor } from "../entities/doctor.entity.js";




export interface IDoctorRepository{
    create(doctor:Doctor):Promise<Doctor>;
    findByEmail(email:string):Promise<Doctor|null>;
    findById(id:string):Promise<Doctor|null>;
    findByDoctorCode(doctorCode:string):Promise<Doctor|null>;
    update(id:string,data:Partial<Doctor>):Promise<Doctor|null>;
    count():Promise<number>;
    findByActivationToken(token:string):Promise<Doctor|null>;
    updateRefreshToken(id:string,refreshToken:string|null):Promise<void>
}