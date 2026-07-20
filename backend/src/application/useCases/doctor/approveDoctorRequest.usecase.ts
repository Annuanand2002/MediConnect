import { Types } from "mongoose";
import { IDepartmentRepository } from "../../../domain/repositories/department.repository.js";
import { IDoctorRepository } from "../../../domain/repositories/doctor.repository.js";
import { IDoctorRequestRepository } from "../../../domain/repositories/doctorRequest.repository.js";
import crypto from "crypto"
import { IEmailService } from "../../../domain/services/doctor/email.service.js";


export class ApproveDoctorRequestUseCase{
    constructor(
        private doctorRequestRepository : IDoctorRequestRepository,
        private doctorRepository : IDoctorRepository,
        private departmentRepository : IDepartmentRepository,
        private emailService:IEmailService
    ){}
    async execute(requestId:string,departmentId : string){
        const doctorRequest = await this.doctorRequestRepository.findById(requestId);
        if(!doctorRequest){
            throw new Error("Doctor request not found")
        }
        if(doctorRequest.status !=="PENDING"){
            throw new Error ("Doctore request has already been processed")
        }
        const existingDoctor = await this.doctorRepository.findByEmail(doctorRequest.email);
        if(existingDoctor){
            throw new Error ("Doctor already exists")
        }
        const department = await this.departmentRepository.findById(departmentId)
        if(!department){
            throw new Error("Department not found")
        }
        if(!department.isActive){
            throw new Error("Department is inacative")
        }
        const doctorCount = await this.doctorRepository.count();
        const doctorCode = `DOC${String(doctorCount + 1).padStart(4,"0")}`
        const doctor = await this.doctorRepository.create({
            fullName : doctorRequest.fullName,
            email : doctorRequest.email,
            phone : doctorRequest.phone,
            dateOfBirth : doctorRequest.dateOfBirth,
            department : new Types.ObjectId(department.id!),
            qualification : doctorRequest.qualification,
            experience : doctorRequest.experience,
            governmentIdNumber : doctorRequest.governmentIdNumber,
            governmentIdUrl : doctorRequest.governmentIdUrl,
            degreeCertificateUrl : doctorRequest.degreeCertificateUrl,
            medicalLicenseUrl : doctorRequest.medicalLicenseUrl,
            doctorCode,
        })
        await this.doctorRequestRepository.update(requestId,{status:"APPROVED",approvedAt:new Date()})

        const activationToken = crypto.randomBytes(32).toString("hex");
        const activationExpiry = new Date(Date.now()+24*60*60*1000)
        await this.doctorRepository.update((doctor as any)._id.toString(),{activationToken,activationTokenExpiresAt:activationExpiry})

        const activationLink = `${process.env.FRONTEND_URL}/doctor/create-password?token=${activationToken}`;

        await this.emailService.sendDoctorActivationEmail(doctor.email,doctor.fullName,activationLink)
    }
}
