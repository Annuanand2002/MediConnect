import { DoctorRequest } from "../../../domain/entities/doctorrequest.entity.js";
import { IDoctorRequestRepository } from "../../../domain/repositories/doctorRequest.repository.js";




export class RegisterDoctorRequestUseCase {
    constructor(private doctorRequestRepository:IDoctorRequestRepository){}

    async execute(request : DoctorRequest):Promise<DoctorRequest>{
        const existingDoctor = await this.doctorRequestRepository.findByEmail(request.email);
        if(existingDoctor){
            throw new Error("A doctor request with this email already exist");
        }
        return await this.doctorRequestRepository.create(request);
    }
}