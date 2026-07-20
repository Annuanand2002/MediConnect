import { IDoctorRepository } from "../../../domain/repositories/doctor.repository.js";
import bcrpt from "bcrypt"


export class CreatePasswordUseCase{
    constructor(private doctorRepository:IDoctorRepository){}
    async execute(token:string,password:string){
        const doctor = await this.doctorRepository.findByActivationToken(token);
        if(!doctor){
            throw new Error("Invalid activation token")
        }
        if(!doctor.activationTokenExpiresAt || doctor.activationTokenExpiresAt < new Date()){
            throw new Error("Activation link has expired.")
        }
        if(doctor.isVerified){
            throw new Error("Account already activated");
        }
        const hashpassword = await bcrpt.hash(password,10)
        await this.doctorRepository.update(doctor.id!,{password:hashpassword,isVerified:true,activationToken:null,activationTokenExpiresAt:null})
    }
}