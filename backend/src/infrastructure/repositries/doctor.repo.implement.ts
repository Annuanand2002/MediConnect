import { Doctor } from "../../domain/entities/doctor.entity.js";
import { IDoctorRepository } from "../../domain/repositories/doctor.repository.js";
import doctorModel from "../database/models/doctor.model.js";





export class DoctorRepository implements IDoctorRepository{
    private mapDoctor(doc:any):Doctor{
        return{
            ...doc,
            id: doc._id.toString()
        }
    }
    async create(doctor: Doctor): Promise<Doctor> {
        const createdDoctor = await doctorModel.create(doctor);
        return this.mapDoctor(createdDoctor.toObject())
    }
    async findByEmail(email: string): Promise<Doctor | null> {
        const doctor = await doctorModel.findOne({email}).lean();
        return doctor?this.mapDoctor(doctor):null
    }
    async findById(id: string): Promise<Doctor | null> {
        const doctor =  await doctorModel.findById(id).lean();
        return doctor? this.mapDoctor(doctor):null;
    }
    async findByDoctorCode(doctorCode: string): Promise<Doctor | null> {
        const doctor = await doctorModel.findOne({doctorCode}).lean();
        return doctor?this.mapDoctor(doctor):null;
    }
    async update(id: string, data: Partial<Doctor>): Promise<Doctor | null> {
        const doctor = await doctorModel.findByIdAndUpdate(id,data,{new:true}).lean();
        return doctor?this.mapDoctor(doctor):null;
    }
    async count(): Promise<number> {
        return await doctorModel.countDocuments()
    }
    async findByActivationToken(token: string): Promise<Doctor | null> {
        const doctor = await doctorModel.findOne({activationToken:token}).lean()
        return doctor? this.mapDoctor(doctor):null;
    }
    async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
        await doctorModel.findByIdAndUpdate(id,{refreshToken})
    }
}