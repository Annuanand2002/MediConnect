import { IDoctorRequestRepository } from "../../../domain/repositories/doctorRequest.repository.js";



export class GetallDoctorsRequestUseCase{
    constructor(private doctorRequesrRepository : IDoctorRequestRepository){}

    async execute(page : number,limit:number,search?:string,status?:string){
        const doctorRequests = await this.doctorRequesrRepository.findAll(page,limit,search,status);
        const total = await this.doctorRequesrRepository.count(search,status);
        return {doctorRequests,pagination : {page,limit,total,totalPages:Math.ceil(total/limit)}}
    }
}