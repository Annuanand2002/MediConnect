import { IDoctorRequestRepository } from "../../../domain/repositories/doctorRequest.repository.js";


export class GetDoctorRequestByIdUseCase{
    constructor(private doctorRequestRepoaitory : IDoctorRequestRepository){}

    async execute(id:string){
        const doctor = await this.doctorRequestRepoaitory.findById(id);
        if(!doctor){
            throw new Error("Doctor request was not found")
        }
        return doctor;
    }
}